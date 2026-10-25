
import { asset, link } from '../components/layout.js';
import { troubleshooting } from '../data/troubleshooting.js';

function issueCard(issue, index) {
  return `
    <article class="card troubleshooting-card">
      <div class="trouble-heading">
        <span class="trouble-index">TROUBLESHOOTING ${String(index + 1).padStart(2, '0')}</span>
        <h3>${issue.title}</h3>
      </div>
      <div class="trouble-grid">
        <div class="trouble-step">
          <h4>01 · 문제 상황</h4>
          <p>${issue.problem}</p>
        </div>
        <div class="trouble-step">
          <h4>02 · 원인 분석</h4>
          <p>${issue.cause}</p>
        </div>
        <div class="trouble-step">
          <h4>03 · 해결 과정</h4>
          <p>${issue.solution}</p>
          ${issue.command ? `<pre class="code-sample"><code>${issue.command.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code></pre>` : ''}
        </div>
        <div class="trouble-step">
          <h4>04 · 해결 결과</h4>
          <p>${issue.result}</p>
        </div>
      </div>
      <p class="lesson"><strong>배운 점</strong> ${issue.lesson}</p>
    </article>
  `;
}

// 프로젝트 아키텍처 이미지 출력
function architectureGallery(project) {

  // images 배열이 있으면 여러 장 출력
  // 없으면 기존 image 한 장만 출력
  const images = project.images?.length
    ? project.images
    : [
        {
          title: '시스템 아키텍처',
          src: project.image
        }
      ];

  return `
    <div class="architecture-gallery">
      ${images.map((image, index) => `
        <div class="card arch">
          <div class="arch-head">
            <div>
              <b>
                ${String(index + 1).padStart(2, '0')} · ${image.title}
              </b>
              ${image.description
                ? `<p class="arch-description">${image.description}</p>`
                : ''}
            </div>

            <a
              href="${asset(image.src)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              원본 크게 보기 ↗
            </a>
          </div>

          <img
            src="${asset(image.src)}"
            alt="${project.title} - ${image.title}"
            loading="lazy"
          >
        </div>
      `).join('')}
    </div>
  `;
}

export function ProjectDetail(project) {
  const issues = troubleshooting[project.id] || [];

  return `
    <div class="detail-back">
      ${link('/projects', '프로젝트 목록으로 돌아가기')}
    </div>

    <header class="detail-top">
      <div>
        <div class="inline-tags">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
        <h1>${project.title}</h1>
        <p>${project.subtitle}</p>
      </div>
      <span class="period">${project.period}</span>
    </header>

    <section class="detail-summary">
      <div class="card summary-text">
        <span class="eyebrow">PROJECT OVERVIEW</span>
        <h2>프로젝트 개요</h2>
        <p>${project.intro}</p>

        <h3>담당 역할</h3>
        <p>${project.role}</p>

        <h3>팀 구성</h3>
        <p>${project.team}</p>
      </div>

      ${architectureGallery(project)}
    </section>

    <section class="detail-section">
      <span class="eyebrow">IMPLEMENTATION</span>
      <h2>주요 구현 내용</h2>

      <div class="task-list">
        ${project.tasks.map((task, index) => `
          <div class="card task">
            <b>${String(index + 1).padStart(2, '0')}</b>
            <span>${task}</span>
          </div>
        `).join('')}
      </div>

    <section class="detail-section">
      <span class="eyebrow">RESULTS</span>
      <h2>프로젝트 성과</h2>

      <div class="card result-card">
        ${project.results.map((result) => `
          <p>
            <span class="check">✓</span>${result}
          </p>
        `).join('')}
      </div>
    </section>

    ${project.videos?.length ? `
      <section class="detail-section video-section">
        <span class="eyebrow">DEMO VIDEOS</span>
        <h2>프로젝트 시연 영상</h2>
        <p class="section-intro">영상으로 실제 구축 및 장애 복구 과정을 확인할 수 있습니다.</p>
        <div class="video-grid">
          ${project.videos.map((video) => {
            const match = video.url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
            const videoId = match ? match[1] : '';
            return `
              <article class="card video-card">
                <a class="video-thumbnail" href="${video.url}" target="_blank" rel="noopener noreferrer" aria-label="${video.title} 영상 보기">
                  <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="${video.title} 유튜브 미리보기" loading="lazy" onerror="this.style.display='none'">
                  <span class="video-play" aria-hidden="true">▶</span>
                </a>
                <div class="video-card-body">
                  <h3>${video.title}</h3>
                  <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="text-link">YouTube에서 시연 영상 보기 ↗</a>
                </div>
              </article>`;
          }).join('')}
        </div>
      </section>` : ''}

    <div class="detail-actions">
      ${project.links.map(([name, url]) => `
        <a
          class="btn secondary"
          href="${url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${name} ↗
        </a>
      `).join('')}

      ${link('/projects', '다른 프로젝트 보기', 'btn primary')}
    </div>
  `;
}
