import { asset, heading } from '../components/layout.js';
import { projects } from '../data/projects.js';

export function projectCard(project) {
  return `
    <a class="project-card card" href="#/projects/${project.id}">
      <div class="project-thumb">
        <img src="${asset(project.image)}" alt="${project.title} 아키텍처" loading="lazy">
      </div>
      <div class="project-body">
        <div class="inline-tags">
          ${project.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join('')}
        </div>
        <h3>${project.title}</h3>
        <p>${project.subtitle}</p>
        <div class="card-bottom">
          <span>${project.period}</span>
          <b>상세 보기 ↗</b>
        </div>
      </div>
    </a>
  `;
}

export function Projects() {
  return `
    ${heading('Projects', '직접 구현하고 해결한<br>프로젝트들입니다.', '카드를 누르면 아키텍처와 트러블슈팅 전체 내용을 볼 수 있습니다.')}
    <div class="filterbar">
      <button class="filter active" data-filter="all">전체</button>
      <button class="filter" data-filter="cloud">클라우드 / 인프라</button>
      <button class="filter" data-filter="automation">자동화 / CI·CD</button>
      <button class="filter" data-filter="app">애플리케이션</button>
    </div>
    <div class="projects-grid" id="project-grid">
      ${projects.map(projectCard).join('')}
    </div>
  `;
}
