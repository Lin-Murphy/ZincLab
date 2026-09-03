import { targetFromDelta } from '@/lib/interaction';

const root = document.querySelector<HTMLElement>('[data-scene-experience]');
const track = root?.querySelector<HTMLElement>('[data-scene-track]');
const scenes = root ? [...root.querySelectorAll<HTMLElement>('[data-scene]')] : [];
const header = document.querySelector<HTMLElement>('[data-site-header]');
const meter = root?.querySelector<HTMLElement>('[data-scene-meter]');

if (root && track && scenes.length) {
  const locale = root.dataset.locale === 'zh' ? 'zh' : 'en';
  const base = (root.dataset.base ?? '/').replace(/\/$/, '');
  const routes = [`${base}/${locale}/`, `${base}/${locale}/talents/`, `${base}/${locale}/projects/`, `${base}/${locale}/?scene=contact`];
  const sceneParam = new URL(location.href).searchParams.get('scene');
  let index = sceneParam ? Math.max(0, scenes.findIndex((scene) => scene.dataset.scene === sceneParam)) : Math.max(0, routes.indexOf(location.pathname));
  let wheelDelta = 0;
  let locked = false;
  let releaseTimer = 0;
  let pointerStart: number | null = null;
  let pointerDelta = 0;
  const wheelThreshold = 120;
  const pointerThreshold = 72;

  const sync = (next: number, push = true) => {
    index = next;
    track.style.setProperty('--scene-index', String(index));
    track.style.setProperty('--drag-y', '0px');
    scenes.forEach((scene, sceneIndex) => {
      const active = sceneIndex === index;
      scene.toggleAttribute('inert', !active);
      scene.setAttribute('aria-hidden', String(!active));
    });
    const scene = scenes[index];
    const key = scene?.dataset.scene ?? 'home';
    const theme = scene?.dataset.navTheme ?? 'light';
    header?.setAttribute('data-theme', theme);
    document.querySelectorAll<HTMLElement>('[data-nav-key]').forEach((link) => {
      if (link.dataset.navKey === key && key !== 'home') link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    meter?.style.setProperty('transform', `scaleY(${(index + 1) / scenes.length})`);
    window.dispatchEvent(new CustomEvent('zinc:scenechange', { detail: { scene: key } }));
    if (push && location.pathname !== routes[index]) history.pushState({ scene: index }, '', routes[index]);
  };

  const transition = (next: number) => {
    if (locked || next === index) {
      track.style.setProperty('--drag-y', '0px');
      return;
    }
    locked = true;
    sync(next);
    window.setTimeout(() => { locked = false; }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 720);
  };

  const previewWheel = () => {
    const bounded = Math.max(-52, Math.min(52, -wheelDelta * 0.2));
    track.style.setProperty('--drag-y', `${bounded}px`);
    window.clearTimeout(releaseTimer);
    releaseTimer = window.setTimeout(() => {
      wheelDelta = 0;
      track.style.setProperty('--drag-y', '0px');
    }, 150);
  };

  root.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (locked) return;
    if (wheelDelta && Math.sign(wheelDelta) !== Math.sign(event.deltaY)) wheelDelta = 0;
    wheelDelta += event.deltaY;
    previewWheel();
    const next = targetFromDelta(index, wheelDelta, wheelThreshold, scenes.length);
    if (next !== index) {
      wheelDelta = 0;
      transition(next);
    }
  }, { passive: false });

  root.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || locked) return;
    pointerStart = event.clientY;
    pointerDelta = 0;
    root.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove', (event) => {
    if (pointerStart === null) return;
    pointerDelta = pointerStart - event.clientY;
    const resistance = (index === 0 && pointerDelta < 0) || (index === scenes.length - 1 && pointerDelta > 0) ? 0.18 : 0.55;
    track.style.setProperty('--drag-y', `${-pointerDelta * resistance}px`);
  });
  const finishPointer = () => {
    if (pointerStart === null) return;
    const next = targetFromDelta(index, pointerDelta, pointerThreshold, scenes.length);
    pointerStart = null;
    pointerDelta = 0;
    transition(next);
  };
  root.addEventListener('pointerup', finishPointer);
  root.addEventListener('pointercancel', finishPointer);

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-key]').forEach((link) => {
    const target = routes.indexOf(new URL(link.href).pathname);
    if (target < 0 || target >= scenes.length) return;
    link.addEventListener('click', (event) => { event.preventDefault(); transition(target); });
  });
  addEventListener('popstate', () => {
    const requested = new URL(location.href).searchParams.get('scene');
    const requestedIndex = requested ? scenes.findIndex((scene) => scene.dataset.scene === requested) : routes.indexOf(location.pathname);
    sync(Math.max(0, requestedIndex), false);
  });
  sync(index, false);
}
