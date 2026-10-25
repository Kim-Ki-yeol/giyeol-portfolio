import { profile } from '../data/profile.js';

export const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

export const navItems = [
  ['/', '홈'],
  ['/about', '소개'],
  ['/projects', '프로젝트'],
  ['/skills', '기술 스택'],
  ['/experience', '경험'],
  ['/contact', '연락처']
];

export function link(path, label, className = '') {
  return `<a class="${className}" href="#${path}">${label}</a>`;
}

export function heading(eyebrow, title, description = '') {
  return `
    <div class="page-heading">
      <span class="eyebrow">${eyebrow} <span class="blue">✦</span></span>
      <h1>${title}</h1>
      ${description ? `<p>${description}</p>` : ''}
    </div>
  `;
}

export function layout(content, activePath) {
  return `
    <div class="site">
      <header class="header">
        <div class="wrap nav">
          <a class="logo" href="#/">Giyeol<span class="dot">.</span></a>
          <nav class="navlinks" id="site-nav" aria-label="주 메뉴">
            ${navItems.map(([path, label]) => link(path, label, activePath === path ? 'active' : '')).join('')}
          </nav>
          <a class="github-icon" href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <button id="menu" class="menu" aria-label="메뉴 열기" aria-expanded="false">☰</button>
        </div>
      </header>
      <main class="wrap main">${content}</main>
      <footer class="footer wrap">
        <span>© 2026 Giyeol · Cloud / DevOps Portfolio</span>
        <span>Infrastructure · Automation · Reliability</span>
      </footer>
    </div>
  `;
}
