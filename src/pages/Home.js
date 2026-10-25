import { asset, link } from '../components/layout.js';
import { profile } from '../data/profile.js';

export function Home() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <span class="pill">Cloud / DevOps Engineer</span>
        <h1>클라우드 인프라로<br>더 나은 서비스를 만드는<br>엔지니어, <em>김기열</em>입니다.</h1>
        <p>Terraform으로 인프라를 코드화하고,<br>GitHub Actions로 배포와 복구를 자동화합니다.<br>문제의 원인을 끝까지 추적하는 엔지니어를 지향합니다.</p>
        <div class="actions">
          ${link('/projects', '프로젝트 둘러보기 ↗', 'btn primary')}
          ${link('/experience', '학력 및 수상 보기 ↗', 'btn secondary')}
        </div>
        <div class="hero-tech">
          ${['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'].map((item) => `<span class="tech-chip">${item}</span>`).join('')}
        </div>
      </div>
      <div class="hero-art photo-panel">
        <div class="art-grid"></div>
        <img src="${asset(profile.photo)}" alt="김기열 증명사진" class="hero-portrait" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <div class="photo-fallback" style="display:none">assets/profile-photo.jpg 파일을 넣어주세요.</div>
        <div class="art-tag">Cloud · DevOps · Automation</div>
      </div>
    </section>
    <section class="home-bottom">
      <div>
        <span class="eyebrow">Selected Work</span>
        <h2>인프라를 구축하고,<br>운영을 자동화합니다.</h2>
      </div>
      <div class="home-bottom-actions">
        ${link('/projects', '4개 프로젝트 살펴보기 ↗', 'text-link')}
        ${link('/about', '소개 더 알아보기 ↗', 'text-link')}
      </div>
    </section>
  `;
}
