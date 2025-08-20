// Año footer
document.getElementById('y').textContent = new Date().getFullYear();

// ===== Scroll-pinned HERO: el scroll se usa como timeline =====
(function(){
  const wrap   = document.getElementById('pinHero');
  const slider = document.getElementById('diagonalSlider');
  const dotsWrap = document.getElementById('sliderDots');
  if(!wrap || !slider || !dotsWrap) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));

  // CONFIGURACIÓN
  const N     = slides.length;
  const seg   = 1 / N;               // cada slide ocupa 1/N del progreso
  const focus = [-220, 0, 220];      // foco por slide (px desde el centro)
  const span  = 140;                 // cuánto se mueve dentro del segmento (px)

  // Crear dots
  dotsWrap.innerHTML = '';
  for(let i=0;i<N;i++){
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ir al slide ${i+1}`);
    b.addEventListener('click',()=>jumpTo(i));
    dotsWrap.appendChild(b);
  }
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  const clamp01 = x => Math.max(0, Math.min(1, x));
  const smooth  = t => t*t*(3 - 2*t);     // smoothstep

  let start=0, end=1, dist=1;
  function measure(){
    start = wrap.offsetTop;                                 // inicio del pin
    end   = start + wrap.offsetHeight - window.innerHeight; // fin del pin
    dist  = Math.max(1, end - start);
  }

  function render(){
    const y = window.scrollY || document.documentElement.scrollTop;
    const p = clamp01((y - start) / dist); // 0..1 progreso del pin

    slides.forEach((s, j)=>{
      const img = s.querySelector('img');

      // progreso local del slide j
      const tLocal = (p - j*seg) / seg;          // puede ser <0 o >1
      const within = clamp01(tLocal);

      // mover imagen alrededor del punto de foco definido
      const x = (focus[j]||0) + (within*2 - 1) * span;
      img.style.transform = `translateX(calc(-50% + ${x}px))`;

      // opacidad con campana (máximo en el centro del segmento)
      const center = (j + 0.5) * seg;
      const d = Math.abs(p - center) / (seg/2);  // 0 en centro, 1 en borde
      const op = clamp01(1 - d);

      s.classList.toggle('is-visible', op > 0.02);
      s.style.opacity = smooth(op);
      s.style.zIndex  = (op > 0.5 ? 3 : 1);
    });

    const idx = Math.min(N-1, Math.max(0, Math.floor(p/seg)));
    dots.forEach((d,k)=>d.classList.toggle('is-active', k===idx));
  }

  function jumpTo(i){
    const target = start + i * dist * seg + 1; // +1px asegura entrar al segmento
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  // Touch (arrastre vertical → progreso)
  let touchStartY = null;
  window.addEventListener('touchstart', (e)=>{
    if(!isInViewport(slider)) return;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});

  window.addEventListener('touchmove', (e)=>{
    if(touchStartY==null || !isInViewport(slider)) return;
    const dy = touchStartY - e.touches[0].clientY;
    // desplazamos suavemente el scroll para “consumirlo” en el pin
    window.scrollBy({ top: dy * 0.6, left: 0 });
    touchStartY = e.touches[0].clientY;
  }, {passive:false});

  function isInViewport(el){
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  // Init
  measure(); render();
  window.addEventListener('scroll', render, {passive:true});
  window.addEventListener('resize', ()=>{ measure(); render(); });
})();
