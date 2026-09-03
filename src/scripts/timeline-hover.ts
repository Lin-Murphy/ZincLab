document.querySelectorAll<HTMLElement>('[data-timeline-item]').forEach((item) => {
  const image = item.querySelector<HTMLImageElement>('img');
  if (!image || matchMedia('(hover: none)').matches) return;

  const move = (event: PointerEvent) => {
    item.style.setProperty('--timeline-x', `${event.clientX + 24}px`);
    item.style.setProperty('--timeline-y', `${event.clientY - 24}px`);
  };
  item.addEventListener('pointerenter', move);
  item.addEventListener('pointermove', move);
});
