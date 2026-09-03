document.querySelectorAll<HTMLElement>('[data-talent-works]').forEach((root) => {
  const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-work-link]')];
  const preview = root.querySelector<HTMLElement>('[data-work-preview]');
  const image = root.querySelector<HTMLImageElement>('[data-work-image]');
  const video = root.querySelector<HTMLVideoElement>('[data-work-video]');
  if (!preview || !image || !video || matchMedia('(hover: none)').matches) return;

  const clear = () => {
    video.pause();
    preview.classList.remove('is-active');
    links.forEach((link) => link.classList.remove('is-muted'));
  };
  const activate = (link: HTMLAnchorElement) => {
    links.forEach((item) => item.classList.toggle('is-muted', item !== link));
    image.src = link.dataset.image ?? '';
    image.alt = link.dataset.imageAlt ?? '';
    const source = link.dataset.video;
    if (source && video.dataset.activeSrc !== source) {
      video.dataset.activeSrc = source;
      video.src = source;
      video.poster = link.dataset.poster ?? '';
      video.load();
    } else if (!source) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    preview.classList.add('is-active');
    if (source) void video.play().catch(() => undefined);
  };

  root.addEventListener('pointerleave', clear);
  links.forEach((link) => {
    link.addEventListener('pointerenter', () => activate(link));
    link.addEventListener('focus', () => activate(link));
    link.addEventListener('blur', clear);
  });
});
