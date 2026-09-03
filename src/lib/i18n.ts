export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export const ui = {
  en: {
    nav: { home: 'Zinc Lab', talents: 'Talents', projects: 'Projects', about: 'About' },
    roster: 'Roster / Placeholder content',
    archive: 'Archive / Placeholder content',
    placeholderStudy: 'Placeholder study',
    placeholderProfile: 'Placeholder profile',
    placeholderProject: 'Placeholder project — no client represented',
    instruction: 'Click image / scroll for next scene',
    play: 'Play featured film',
    info: 'Info',
    showreel: 'Showreel', temporaryMedia: 'Temporary video sample',
    mediaPending: 'Media pending',
    client: 'Client', year: 'Year', format: 'Format', back: 'Back to projects',
    selectedWorks: 'Selected works', workPreview: 'Selected work preview', timeline: 'Timeline',
    skip: 'Skip to content', enquiries: 'Enquiries',
  },
  zh: {
    nav: { home: 'Zinc Lab', talents: '创作者', projects: '项目', about: '关于' },
    roster: '名单 / 临时内容', archive: '档案 / 临时内容',
    placeholderStudy: '临时影像研究', placeholderProfile: '临时人物档案',
    placeholderProject: '临时项目 — 不代表客户作品',
    instruction: '点击画面 / 滚动进入下一场景', play: '播放首页影像',
    info: '信息', showreel: '作品集', temporaryMedia: '临时视频样例', mediaPending: '素材待定',
    client: '客户', year: '年份', format: '形式', back: '返回项目',
    selectedWorks: '精选作品', workPreview: '精选作品预览', timeline: '编年内容',
    skip: '跳至主要内容', enquiries: '合作咨询',
  },
} as const;

export function localize(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function route(locale: Locale, section = '', slug = '') {
  const parts = [locale, section, slug].filter(Boolean);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${parts.join('/')}/`;
}

export function asset(source: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return source.startsWith('/') ? `${base}${source}` : source;
}
