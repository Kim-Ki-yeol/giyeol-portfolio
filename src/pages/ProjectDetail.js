
import { asset, link } from '../components/layout.js';
import { troubleshooting } from '../data/troubleshooting.js';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// 트러블슈팅 카드
function issueCard(issue, index) {
  return `
    <article class="card troubleshooting-card">
      <div class="trouble-heading">
        <span class="trouble-index">
          TROUBLESHOOTING ${String(index + 1).padStart(2, '0')}
        </span>
        <h3>${escapeHtml(issue.title)}</h3>
      </div>

      <div class="trouble-grid">
        <div class="trouble-step">
          <h4>01 · 문제 상황</h4>
          <p>${escapeHtml(issue.problem)}</p>
        </div>

        <div class="trouble-step">
          <h4>02 · 원인 분석</h4>
          <p>${escapeHtml(issue.cause)}</p>
        </div>

        <div class="trouble-step">
          <h4>03 · 해결 과정</h4>
          <p>${escapeHtml(issue.solution)}</p>

          ${issue.command ? `
            <pre class="code-sample"><code>${escapeHtml(issue.command)}</code></pre>
          ` : ''}
        </div>

        <div class="trouble-step">
          <h4>04 · 해결 결과</h4>
          <p>${escapeHtml(issue.result)}</p>
        </div>
      </div>

      ${issue.lesson ? `
        <p class="lesson">
          <strong>배운 점</strong>
          ${escapeHtml(issue.lesson)}
        </p>
      ` : ''}
    </article>
  `;
}

// 프로젝트 아키텍처 이미지 출력
function architectureGallery(project) {
  const images = project.images?.length
    ? project.images
    : project.image
      ? [{
          title: '시스템 아키텍처',
          src: project.image
        }]
      : [];

  if (!images.length) return '';

  return `
    <div class="architecture-gallery">
      ${images.map((image, index) => `
        <div class="card arch">
          <div class="arch-head">
            <div>
              <b>
                ${String(index + 1).padStart(2, '0')}
                · ${escapeHtml(image.title || '시스템 아키텍처')}
              </b>

              ${image.description ? `
                <p class="arch-description">
                  ${escapeHtml(image.description)}
                </p>
              ` : ''}
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
            alt="${escapeHtml(project.title)} - ${escapeHtml(image.title || '시스템 아키텍처')}"
            loading="lazy"
          >
        </div>
      `).join('')}
    </div>
  `;
}

// YouTube 영상 ID 추출
function getYouTubeId(url) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (
      hostname === 'youtu.be' ||
      hostname === 'www.youtu.be'
    ) {
      return parsed.pathname.split('/')[1] || '';
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'www.youtube.com' ||
      hostname === 'm.youtube.com'
    ) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v') || '';
      }

      const match = parsed.pathname.match(
        /^\/(?:embed|shorts|live)\/([a-zA-Z0-9_-]{11})/
      );

      return match ? match[1] : '';
    }

    return '';
  } catch {
    return '';
  }
}

// 프로젝트 시연 영상 출력
function videoGallery(project) {
  if (!project.videos?.length) return '';

  return `
    <section class="detail-section video-section">
      <span class="eyebrow">DEMO VIDEOS</span>
      <h2>프로젝트 시연 영상</h2>

      <p class="section-intro">
        영상으로 실제 구축 및 장애 복구 과정을 확인할 수 있습니다.
      </p>

      <div class="video-grid">
        ${project.videos.map((video) => {
          const videoId = getYouTubeId(video.url);

          return `
            <article class="card video-card">
              <a
                class="video-thumbnail"
                href="${escapeHtml(video.url)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHtml(video.title)} 영상 보기"
              >
                ${videoId ? `
                  <img
                    src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg"
                    alt="${escapeHtml(video.title)} 유튜브 미리보기"
                    loading="lazy"
                  >
                ` : ''}

                <span class="video-play" aria-hidden="true">
                  ▶
                </span>
              </a>

              <div class="video-card-body">
                <h3>${escapeHtml(video.title)}</h3>

                <a
                  href="${escapeHtml(video.url)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-link"
                >
                  YouTube에서 시연 영상 보기 ↗
                </a>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

// 프로젝트 상세 페이지
export function ProjectDetail(project) {
  // 프로젝트 ID에 맞는 트러블슈팅 가져오기
  const issues = troubleshooting[project.id] || [];

  return `
    <div class="detail-back">
      ${link('/projects', '프로젝트 목록으로 돌아가기')}
    </div>

    <header class="detail-top">
      <div>
        <div class="inline-tags">
          ${(project.tags || []).map((tag) => `
            <span>${escapeHtml(tag)}</span>
          `).join('')}
        </div>

        <h1>${escapeHtml(project.title)}</h1>
        <p>${escapeHtml(project.subtitle)}</p>
      </div>

      <span class="period">
        ${escapeHtml(project.period)}
      </span>
    </header>

    <!-- 프로젝트 개요 -->
    <section class="detail-summary">
      <div class="card summary-text">
        <span class="eyebrow">PROJECT OVERVIEW</span>
        <h2>프로젝트 개요</h2>

        <p>${escapeHtml(project.intro)}</p>

        <h3>담당 역할</h3>
        <p>${escapeHtml(project.role)}</p>

        <h3>팀 구성</h3>
        <p>${escapeHtml(project.team)}</p>
      </div>

      ${architectureGallery(project)}
    </section>

    <!-- 주요 구현 내용 -->
    <section class="detail-section">
      <span class="eyebrow">IMPLEMENTATION</span>
      <h2>주요 구현 내용</h2>

      <div class="task-list">
        ${(project.tasks || []).map((task, index) => `
          <div class="card task">
            <b>${String(index + 1).padStart(2, '0')}</b>
            <span>${escapeHtml(task)}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 프로젝트별 트러블슈팅 -->
    ${issues.length ? `
      <section class="detail-section">
        <span class="eyebrow">TROUBLESHOOTING</span>
        <h2>트러블슈팅</h2>

        <p class="section-intro">
          프로젝트 진행 중 발생한 문제와
          해결 과정을 정리했습니다.
        </p>

        <div class="troubleshooting-list">
          ${issues.map((issue, index) =>
            issueCard(issue, index)
          ).join('')}
        </div>
      </section>
    ` : ''}

    <!-- 프로젝트 성과 -->
    <section class="detail-section">
      <span class="eyebrow">RESULTS</span>
      <h2>프로젝트 성과</h2>

      <div class="card result-card">
        ${(project.results || []).map((result) => `
          <p>
            <span class="check">✓</span>
            ${escapeHtml(result)}
          </p>
        `).join('')}
      </div>
    </section>

    <!-- 프로젝트 시연 영상 -->
    ${videoGallery(project)}

    <!-- 다른 프로젝트 보기 -->
    <div class="detail-actions">
      ${link(
        '/projects',
        '다른 프로젝트 보기',
        'btn primary'
      )}
    </div>
  `;
}
