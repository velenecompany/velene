import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres el asistente oficial de VELENÉ, marca de athleisure premium de Guadalajara, México.

Tu personalidad: sofisticado, conciso, amable. Hablas en español. Nunca uses emojis en exceso — máximo uno por respuesta si es necesario.

INFORMACIÓN DE LA MARCA:
- Fundador: Alain Herrera
- Ciudad: Guadalajara, México
- Estilo: athleisure premium, drops limitados
- Dominio: velene.club
- Instagram: @vela_cmnty
- TikTok: @vela_ofi

DROP ACTIVO — The Conclave:
Sets: $899 MXN (Rosa, Beige) | Set Azul en oferta $599 MXN
T-Shirts: $599 MXN (Rosa, Beige, Azul)
Todas las piezas: bordado premium + serigrafía alta definición

TALLAS DISPONIBLES: XS, S, M, L, XL

ENVÍOS:
- República Mexicana: 3-5 días hábiles
- Internacional: próximamente

DEVOLUCIONES:
- 7 días después de recibir el pedido
- La pieza debe estar sin uso y con etiquetas

MEMBERSHIP TIERS (acceso anticipado a drops):
- Pace: 5% descuento
- Drive: 10% descuento  
- Apex: 15% descuento

Si no sabes algo, di que lo consultarás con el equipo y que escriban a hola@velene.club.
Nunca inventes información sobre pedidos, precios o disponibilidad que no esté en este prompt.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', JSON.stringify(errorData));
      return NextResponse.json({ reply: `Error Groq: ${JSON.stringify(errorData)}` }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? 'No pude procesar tu mensaje.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ reply: `Error: ${String(error)}` }, { status: 500 });
  }
}