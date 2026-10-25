import { heading, link } from '../components/layout.js';
import { skills } from '../data/profile.js';

export function Skills() {
  return `
    ${heading('Tech Stack', '기술을 연결해<br>운영 가능한 시스템을 만듭니다.', '실제 프로젝트에서 사용한 기술을 분야별로 정리했습니다.')}
    <div class="skills-grid">
      ${skills.map(({ group, items }) => `
        <div class="card skill-card">
          <h2>${group}</h2>
          <p>${items}</p>
        </div>
      `).join('')}
    </div>
    <div class="card note-card">
      <h3>기술보다 중요한 건 문제 해결 과정</h3>
      <p>EKS 재생성, Terraform State 관리, Cross-Region RDS 설정, Private Subnet 배포 등 실제 문제를 분석하고 해결한 과정을 프로젝트 상세 페이지에 기록했습니다.</p>
      ${link('/projects', '프로젝트에서 확인하기 ↗', 'text-link')}
    </div>
  `;
}
