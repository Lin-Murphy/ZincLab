document.querySelectorAll<HTMLElement>('[data-talent-list]').forEach((root) => {
  const links = [...root.querySelectorAll<HTMLAnchorElement>('[data-talent-link]')];
  const left = root.querySelector<HTMLImageElement>('[data-preview-left]');
  const right = root.querySelector<HTMLImageElement>('[data-preview-right]');
  if (!left || !right || matchMedia('(hover: none)').matches) return;

  const activate = (link: HTMLAnchorElement) => {
    links.forEach((item) => item.classList.toggle('is-muted', item !== link));
    left.src = link.dataset.left ?? '';
    left.alt = link.dataset.leftAlt ?? '';
    right.src = link.dataset.right ?? '';
    right.alt = link.dataset.rightAlt ?? '';
    root.classList.add('has-active-preview');
  };
  const clear = () => {
    links.forEach((item) => item.classList.remove('is-muted'));
    root.classList.remove('has-active-preview');
  };
  links.forEach((link) => {
    link.addEventListener('pointerenter', () => activate(link));
    link.addEventListener('focus', () => activate(link));
    link.addEventListener('mouseleave', clear);
    link.addEventListener('blur', clear);
  });
});
