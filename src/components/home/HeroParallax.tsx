'use client';
import { useEffect, useRef } from 'react';

export default function HeroParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translate3d(0,${window.scrollY * 0.3}px,0)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} style={{position:'absolute',inset:0,top:'-10%',height:'120%'}}>
      <img src="/IMG_9363.jpg" alt="VELENÉ" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center center'}} />
    </div>
  );
}
