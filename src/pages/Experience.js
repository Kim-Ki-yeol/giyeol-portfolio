import { asset, heading } from '../components/layout.js';
import { education, awards } from '../data/profile.js';

export function Experience() {
  return `
    ${heading('Experience', '배우고, 만들고,<br>꾸준히 성장해 왔습니다.')}
    <div class="experience-grid">
      <section class="card timeline-card">
        <span class="eyebrow">EDUCATION</span>
        <h2>학력 및 교육</h2>
        <div class="timeline">
          ${education.map(({ period, name, detail }) => `
            <div class="timeline-item">
              <small>${period}</small>
              <h3>${name}</h3>
              <p>${detail}</p>
            </div>
          `).join('')}
        </div>
      </section>
      <div class="exp-right">
        <section class="card timeline-card">
          <span class="eyebrow">AWARDS</span>
          <h2>수상 내역 및 상장</h2>
          <div class="award-list">
            ${awards.map((award) => `
              <article class="award-item">
                <a href="${asset(award.image)}" target="_blank" rel="noopener noreferrer">
                  <img src="${asset(award.image)}" alt="${award.title} 상장 이미지" loading="lazy">
                </a>
                <div>
                  <small>${award.date}</small>
                  <h3>${award.title}</h3>
                  <p>${award.description}</p>
                  <a class="text-link" href="${asset(award.image)}" target="_blank" rel="noopener noreferrer">상장 원본 보기 ↗</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
        <section class="card timeline-card">
          <span class="eyebrow">FOCUS</span>
          <h2>관심 분야</h2>
          <p>Cloud Infrastructure · DevOps · IaC · CI/CD · Disaster Recovery · Observability</p>
        </section>
      </div>
    </div>
  `;
}
