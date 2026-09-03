const page = document.querySelector<HTMLElement>('[data-edge-navigation]');

if (page) {
  const previous = page.dataset.edgePrevious;
  const next = page.dataset.edgeNext;
  let wheelDelta = 0;
  let resetTimer = 0;
  let touchStart: number | null = null;
  let navigating = false;

  const go = (href: string | undefined) => {
    if (!href || navigating) return;
    navigating = true;
    window.location.assign(href);
  };

  page.addEventListener('wheel', (event) => {
    if (navigating || Math.abs(event.deltaY) < 1) return;
    const atTop = window.scrollY <= 2;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) return;
    wheelDelta = Math.sign(event.deltaY) === Math.sign(wheelDelta) ? wheelDelta + event.deltaY : event.deltaY;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => { wheelDelta = 0; }, 180);
    if (Math.abs(wheelDelta) >= 120) {
      const href = wheelDelta < 0 ? previous : next;
      wheelDelta = 0;
      go(href);
    }
  }, { passive: true });

  page.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') touchStart = event.clientY;
  });
  page.addEventListener('pointerup', (event) => {
    if (touchStart === null) return;
    const delta = touchStart - event.clientY;
    touchStart = null;
    const atTop = window.scrollY <= 2;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (Math.abs(delta) >= 72 && ((delta < 0 && atTop) || (delta > 0 && atBottom))) go(delta < 0 ? previous : next);
  });
}
