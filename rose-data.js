// Datos compartidos de Rosé Nails + helpers de reserva y motion.
// Números de WhatsApp de cada sede.
window.RoseData = {
  horario: '8:00 am a 7:00 pm',
  sedes: [
    { id: 'jardines', name: 'Jardines', zona: 'Envigado', dir: 'Calle 25B Sur #45-75, Envigado', wa: '573045823082' },
    { id: 'laureles', name: 'Laureles', zona: 'Laureles', dir: 'Cra. 78 #35-78', wa: '573013296766' },
    { id: 'mesa', name: 'Mesa', zona: 'Envigado · Zona 9', dir: 'Cl. 37A Sur #34-13, Zona 9', wa: '573008102321' },
    { id: 'poblado', name: 'Poblado', zona: 'Mall Piazza Bella', dir: 'Cra. 29D #6A-05, local 107', wa: '573015725858' },
    { id: 'sabaneta', name: 'Sabaneta', zona: 'Sabaneta', dir: 'Cra. 48 #73 Sur 18', wa: '573002214111' }
  ],
  casa: { id: 'casa', name: 'Rosé en Casa', zona: 'A domicilio · zona Poblado', dir: 'Vamos a tu casa', horario: 'Con cita previa', wa: '573045830353' },
  categorias: [
    { n: 'Tradicional', d: 'Esmalte clásico, limpieza y forma.', items: [{ n: 'Manicure tradicional', t: '45 min' }, { n: 'Pedicure tradicional', t: '60 min' }, { n: 'Mani + pedi clásico', t: '1 h 45 min' }] },
    { n: 'Semipermanente', d: 'Brillo intacto por semanas.', items: [{ n: 'Manicure semipermanente', t: '60 min' }, { n: 'Pedicure semipermanente', t: '75 min' }, { n: 'Combo semipermanente + pedi clásico', t: '2 h' }] },
    { n: 'Poligel', d: 'Extensión ligera y resistente.', items: [{ n: 'Uñas en poligel', t: '2 h' }, { n: 'Retoque de poligel', t: '1 h 30 min' }] },
    { n: 'Acrílico', d: 'Largo y forma a tu medida.', items: [{ n: 'Uñas acrílicas', t: '2 h 30 min' }, { n: 'Retoque acrílico', t: '1 h 30 min' }] },
    { n: 'Evolution', d: 'Nuestra línea de refuerzo.', items: [{ n: 'Evolution manos', t: '1 h 30 min' }, { n: 'Retoque Evolution', t: '1 h' }] },
    { n: 'Extreme', d: 'Largos y diseños de impacto.', items: [{ n: 'Extreme largo', t: '3 h' }, { n: 'Retoque Extreme', t: '2 h' }] },
    { n: 'Decoración', d: 'El detalle que lo cambia todo.', items: [{ n: 'Base rubber (adicional)', t: '15 min' }, { n: 'Nail art por uña', t: '10 min' }, { n: 'Francés', t: '20 min' }] },
    { n: 'Familia', d: 'Para ir juntas.', items: [{ n: 'Manicure niñas', t: '30 min' }, { n: 'Mamá e hija', t: '1 h 30 min' }] }
  ],
  top: [
    { n: 'Pedicure semipermanente', t: '75 min' },
    { n: 'Mani + pedi clásico', t: '1 h 45 min' },
    { n: 'Manicure semipermanente', t: '60 min' },
    { n: 'Combo semipermanente + pedi clásico', t: '2 h' },
    { n: 'Base rubber (adicional)', t: '15 min' }
  ],
  price: 'desde [precio]',
  all() { return this.sedes.map(s => ({ horario: this.horario, ...s })).concat([this.casa]); },
  find(id) { return this.all().find(s => s.id === id) || null; },
  link(s, svc) {
    const msg = 'Hola, quiero agendar una cita en Rosé Nails ' + s.name + (svc ? ' para ' + svc : '');
    return 'https://wa.me/' + s.wa + '?text=' + encodeURIComponent(msg);
  },
  maps(s) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rosé Nails ' + s.dir + ', Medellín'); },
  getSaved() { try { return localStorage.getItem('roseNails.sede'); } catch (e) { return null; } },
  save(id) { try { localStorage.setItem('roseNails.sede', id); } catch (e) {} },
  reduced() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; },
  split(el) {
    const walk = n => { [...n.childNodes].forEach(c => {
      if (c.nodeType === 3 && c.textContent.trim()) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return; if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(w)); return; }
          const ws = document.createElement('span'); ws.style.cssText = 'display:inline-block;white-space:nowrap';
          [...w].forEach(ch => { const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;padding:.06em 0 .24em;margin:-.06em 0 -.24em'; const i = document.createElement('span'); i.setAttribute('data-ch', ''); i.style.display = 'inline-block'; i.textContent = ch; o.appendChild(i); ws.appendChild(o); });
          f.appendChild(ws);
        });
        c.replaceWith(f);
      } else if (c.nodeType === 1) walk(c);
    }); };
    walk(el); return el.querySelectorAll('[data-ch]');
  },
  magnet(el, k) {
    k = k || 0.3; el.style.transition = (el.style.transition ? el.style.transition + ',' : '') + 'translate .5s cubic-bezier(.2,.9,.25,1)';
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.translate = ((e.clientX - r.left - r.width / 2) * k) + 'px ' + ((e.clientY - r.top - r.height / 2) * k * 1.3) + 'px'; });
    el.addEventListener('mouseleave', () => { el.style.translate = '0 0'; });
  },
  motion() {
    if (this._m || this.reduced() || !window.gsap || !window.ScrollTrigger) return;
    this._m = true;
    const g = window.gsap, ST = window.ScrollTrigger; g.registerPlugin(ST);
    const C = { clearProps: 'transform,opacity' };
    const hero = document.querySelectorAll('[data-hero]');
    if (hero.length) g.from(hero, { opacity: 0, y: 40, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15, ...C });
    document.querySelectorAll('h1, h2').forEach(h => { const ch = this.split(h); g.from(ch, { yPercent: 115, rotate: 6, duration: 0.95, stagger: 0.022, ease: 'power4.out', onComplete: () => ch.forEach(c => c.parentNode.style.overflow = 'visible'), scrollTrigger: { trigger: h, start: 'top 92%', once: true } }); });
    document.querySelectorAll('[data-reveal]').forEach(el => g.from(el, { opacity: 0, y: 44, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, ...C }));
    document.querySelectorAll('[data-stagger]').forEach(el => g.from(el.children, { opacity: 0, y: 46, scale: 0.94, duration: 0.85, stagger: 0.08, ease: 'back.out(1.5)', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, ...C }));
    document.querySelectorAll('[data-marquee]').forEach(el => g.to(el, { xPercent: -50, duration: Number(el.dataset.marquee) || 24, ease: 'none', repeat: -1 }));
    document.querySelectorAll('[data-float]').forEach((el, i) => g.to(el, { y: -12, rotation: '+=4', duration: 2.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
    document.querySelectorAll('[data-parallax]').forEach(el => g.to(el, { yPercent: Number(el.dataset.parallax) || -12, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    document.querySelectorAll('[data-img]').forEach(el => {
      g.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
      const inner = el.firstElementChild; if (inner) g.fromTo(inner, { scale: 1.25 }, { scale: 1.06, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('[data-count]').forEach(el => { const v = { n: 0 }, t = Number(el.dataset.count); g.to(v, { n: t, duration: 2, ease: 'power2.out', onUpdate: () => el.textContent = t % 1 ? v.n.toFixed(1) : Math.round(v.n), scrollTrigger: { trigger: el, start: 'top 92%', once: true } }); });
    const fab = document.querySelector('[data-fab]'); if (fab) g.from(fab, { y: 120, scale: 0.6, opacity: 0, duration: 1.1, delay: 1, ease: 'elastic.out(1,.55)', ...C });
    const bar = document.createElement('div'); bar.style.cssText = 'position:fixed;left:0;top:0;height:3px;width:100%;background:#C995A0;transform-origin:0 50%;transform:scaleX(0);z-index:70;pointer-events:none'; document.body.appendChild(bar);
    g.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
    if (matchMedia('(hover:hover) and (min-width:760px)').matches) {
      document.querySelectorAll('[data-magnet]').forEach(el => this.magnet(el));
      const dot = document.createElement('div'); dot.style.cssText = 'position:fixed;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#C995A0;mix-blend-mode:multiply;pointer-events:none;z-index:80;transition:width .3s,height .3s,margin .3s,opacity .3s;opacity:0'; document.body.appendChild(dot);
      const qx = g.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' }), qy = g.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });
      addEventListener('mousemove', e => { dot.style.opacity = .55; qx(e.clientX); qy(e.clientY); const big = e.target.closest && e.target.closest('a,button'); dot.style.width = dot.style.height = big ? '44px' : '14px'; dot.style.margin = big ? '-22px 0 0 -22px' : '-7px 0 0 -7px'; });
      document.addEventListener('mouseleave', () => dot.style.opacity = 0);
    }
    setTimeout(() => { if (g.ticker.time < 0.5) g.globalTimeline.getChildren(true, true, false).forEach(t => t.progress(1)); }, 2500);
  },
  cookies(force) {
    let saved = null; try { saved = localStorage.getItem('roseNails.cookies'); } catch (e) {}
    let box = document.getElementById('rose-cookies');
    if (box) { if (force) box.remove(); else return; }
    if (saved && !force) return;
    box = document.createElement('div'); box.id = 'rose-cookies';
    box.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:90;width:min(calc(100vw - 32px),380px);padding:20px;border-radius:24px;background:#fff;color:#3d1a2b;box-shadow:0 20px 60px rgba(61,26,43,.25);font:400 14px/1.5 Jost,system-ui,sans-serif;transform:translateY(30px);opacity:0;transition:transform .5s cubic-bezier(.2,.9,.25,1.2),opacity .4s';
    const policy = '<div data-pol style="display:none;max-height:40vh;overflow:auto;margin:10px 0 0;padding:12px 14px;border-radius:14px;background:#fce4ec;font-size:12.5px;color:#5a2a40"><b>Política de cookies</b><br>Usamos cookies técnicas, necesarias para recordar tu sede y tus preferencias, y cookies de analítica para entender cómo se usa el sitio y mejorarlo. No vendemos tus datos. Puedes aceptarlas, rechazar las opcionales o borrarlas desde tu navegador cuando quieras. [Texto legal por validar con el cliente]</div>';
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;font:600 16px Jost,system-ui,sans-serif"><span style="width:12px;height:20px;border-radius:3px 3px 6px 6px;background:#c23f68"></span>Cookies, con cariño</div><p style="margin:8px 0 0;color:#5a2a40">Usamos cookies para recordar tu sede y mejorar tu experiencia. <a href="#" data-more style="color:#c23f68">Ver política</a></p>' + policy + '<div style="display:flex;gap:8px;margin-top:14px"><button data-ok style="flex:1;height:44px;border-radius:22px;border:0;background:#c23f68;color:#fff;font:500 14px Jost,system-ui,sans-serif;cursor:pointer">Aceptar</button><button data-no style="flex:1;height:44px;border-radius:22px;border:1.5px solid #f2b8c9;background:#fff;color:#3d1a2b;font:500 14px Jost,system-ui,sans-serif;cursor:pointer">Solo necesarias</button></div>';
    document.body.appendChild(box);
    const close = v => { try { localStorage.setItem('roseNails.cookies', v); } catch (e) {} box.style.transform = 'translateY(30px)'; box.style.opacity = 0; setTimeout(() => box.remove(), 500); };
    box.querySelector('[data-ok]').onclick = () => close('all');
    box.querySelector('[data-no]').onclick = () => close('necessary');
    box.querySelector('[data-more]').onclick = e => { e.preventDefault(); const p = box.querySelector('[data-pol]'); p.style.display = p.style.display === 'none' ? 'block' : 'none'; };
    if (force) box.querySelector('[data-pol]').style.display = 'block';
    requestAnimationFrame(() => setTimeout(() => { box.style.transform = 'none'; box.style.opacity = 1; }, force ? 0 : 1400));
  }
};
