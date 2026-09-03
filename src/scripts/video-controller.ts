import { nextLoopIndex, shouldQueuePreload } from '@/lib/interaction';

const root = document.querySelector<HTMLElement>('[data-home-films]');
if (root) {
  const films = [...root.querySelectorAll<HTMLElement>('[data-film]')];
  const progress = root.querySelector<HTMLElement>('[data-film-progress]');
  const count = root.querySelector<HTMLElement>('[data-film-count]');
  let index = 0;
  let placeholderStart = performance.now();
  let raf = 0;
  let fallbackTimer = 0;
  const placeholderDuration = 6500;

  const getVideo = (at: number) => films[at]?.querySelector<HTMLVideoElement>('video') ?? null;

  const loadVideo = (at: number) => {
    const video = getVideo(at);
    if (!video || video.src || !video.dataset.src) return;
    video.src = video.dataset.src;
    video.addEventListener('canplay', () => queueNext(at), { once: true });
    video.load();
  };

  const queueNext = (at: number) => {
    const current = getVideo(at);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!shouldQueuePreload({
      saveData: connection?.saveData,
      effectiveType: connection?.effectiveType,
      currentReadyState: current?.readyState ?? 4,
      currentIsBuffering: current ? current.readyState < 3 : false,
    })) return;
    const next = at + 1;
    if (next < films.length) window.setTimeout(() => loadVideo(next), 250);
  };

  const tick = (now: number) => {
    const video = getVideo(index);
    const ratio = video && Number.isFinite(video.duration) && video.duration > 0
      ? video.currentTime / video.duration
      : Math.min(1, (now - placeholderStart) / placeholderDuration);
    progress?.style.setProperty('transform', `scaleX(${ratio})`);
    raf = requestAnimationFrame(tick);
  };

  const show = async (next: number) => {
    const previousVideo = getVideo(index);
    previousVideo?.pause();
    index = next;
    placeholderStart = performance.now();
    films.forEach((film, filmIndex) => {
      const active = filmIndex === index;
      film.classList.toggle('is-active', active);
      film.setAttribute('aria-hidden', String(!active));
    });
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(films.length).padStart(2, '0')}`;
    loadVideo(index);
    const video = getVideo(index);
    window.clearTimeout(fallbackTimer);
    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
      } catch { /* Autoplay can be blocked; the poster remains visible. */ }
      video.onended = () => show(nextLoopIndex(index, films.length));
    } else {
      fallbackTimer = window.setTimeout(() => show(nextLoopIndex(index, films.length)), placeholderDuration);
      queueNext(index);
    }
  };

  root.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, .film-progress')) return;
    void show(nextLoopIndex(index, films.length));
  });
  addEventListener('zinc:scenechange', ((event: CustomEvent<{ scene: string }>) => {
    const video = getVideo(index);
    if (event.detail.scene !== 'home') video?.pause();
    else if (video) void video.play().catch(() => undefined);
  }) as EventListener);
  document.addEventListener('visibilitychange', () => {
    const video = getVideo(index);
    if (document.hidden) video?.pause();
    else if (video) void video.play().catch(() => undefined);
  });
  void show(0);
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(tick);
}
