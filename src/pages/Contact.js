import { heading } from '../components/layout.js';
import { profile } from '../data/profile.js';

export function Contact() {
  return `
    <style>
      .contact-item {
        padding: 32px;
        font-size: 20px;
      }

      .contact-item small {
        display: block;
        font-size: 18px;
        margin-bottom: 12px;
      }

      .contact-item b {
        display: block;
        font-size: 24px;
        font-weight: 600;
        overflow-wrap: anywhere;
      }

      .contact-item span {
        font-size: 30px;
      }

      @media (max-width: 768px) {
        .contact-item {
          padding: 24px;
        }

        .contact-item b {
          font-size: 18px;
        }
      }
    </style>

    ${heading(
      'Contact',
      '함께 성장할 기회를<br>기다리고 있습니다.',
      '새로운 도전과 좋은 기회에 항상 열려 있습니다.'
    )}

    <div class="contact-grid">
      <a
        class="card contact-item"
        href="mailto:${profile.email}"
      >
        <div>
          <small>이메일</small>
          <b>${profile.email}</b>
        </div>
        <span>↗</span>
      </a>

      <a
        class="card contact-item"
        href="${profile.github}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <small>GitHub</small>
          <b>${profile.github}</b>
        </div>
        <span>↗</span>
      </a>
    </div>
  `;
}