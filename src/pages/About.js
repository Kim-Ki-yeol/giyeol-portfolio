import { asset, heading } from '../components/layout.js';
import { profile } from '../data/profile.js';

export function About() {
  return `
    ${heading('About Me', '문제를 해결하며<br>성장하는 클라우드 엔지니어', '반복 작업은 자동화하고, 장애의 원인은 끝까지 확인합니다.')}
    <div class="about-grid">
      <section class="card about-text">
        <span class="eyebrow">Hello, I’m Giyeol.</span>
        <h2>구축에서 끝나지 않고<br>운영과 복구까지 고민합니다.</h2>
        <p>KT Cloud 클라우드 인프라 전문가 양성 과정에서 AWS, Terraform, GitHub Actions를 활용해 인프라와 운영 작업을 자동화했습니다. AI-SRE Console 프로젝트에서는 서울·도쿄 멀티 리전 환경과 DR Failover 검증 Workflow를 구축하고, EKS·RDS·Health Check 문제를 해결했습니다.</p>
        <p>Warm Standby 프로젝트에서는 Terraform State와 Route53 Failover를 다뤘고, K3s 프로젝트에서는 Bastion Host의 Self-hosted Runner로 Private Subnet 배포 문제를 해결했습니다.</p>
        <div class="inline-tags"><span>IaC</span><span>CI/CD</span><span>Disaster Recovery</span><span>Troubleshooting</span></div>
      </section>
      <section class="card profile-card">
        <img class="profile-photo" src="${asset(profile.photo)}" alt="김기열 증명사진">
        <h2>${profile.name}</h2>
        <p>${profile.title}</p>
        <div class="profile-lines">
          <span>${profile.email}</span>
          <a href="${profile.github}" target="_blank" rel="noopener noreferrer">${profile.github}</a>
        </div>
      </section>
    </div>
    <div class="four-grid">
      ${[
        ['Cloud Infrastructure', 'AWS 멀티 리전 및 EKS 인프라 구축'],
        ['IaC & Automation', 'Terraform과 GitHub Actions 운영 자동화'],
        ['Disaster Recovery', 'DNS Failover 및 복구 검증'],
        ['Problem Solving', '장애 원인 분석과 재발 방지 절차 개선']
      ].map(([title, description]) => `
        <div class="card mini-feature">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
      `).join('')}
    </div>
  `;
}
