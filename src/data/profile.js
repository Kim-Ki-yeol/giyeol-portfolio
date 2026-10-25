// 개인정보, 학력, 수상 내역은 이 파일에서 수정하세요.
export const profile = {
  name: '김기열',
  title: 'Cloud / DevOps Engineer',
  email: 'rlarlduf9435@gmail.com',
  github: 'https://github.com/Kim-Ki-yeol',
  photo: 'profile-photo.jpg'
};

export const education = [
  { period: '2026.10.01 — 2026.10.31', name: '아주대학교 AI 개발자 과정 고급', detail: '청년도약부트캠프 (진행 중)' },
  { period: '2026.09.07 — 2026.09.21', name: '아주대학교 AI 개발자 과정 중급', detail: '청년도약부트캠프' },
  { period: '2025.12 — 2026.07', name: 'KT Cloud 클라우드 인프라 전문가 양성 과정', detail: '클라우드 인프라 및 자동화' },
  { period: '2024.03 — 2026.02', name: '한신대학교 컴퓨터공학부', detail: '졸업 · 3.99 / 4.5' },
  { period: '2020.03 — 2024.02', name: '나사렛대학교 IT융합학부', detail: '수료 · 3.8 / 4.5' }
];

export const awards = [
  {
    date: '2025.11.19',
    title: '한신대학교 AI/SW 캡스톤디자인 경진대회 장려상',
    description: 'DUR API 기반 복약 관리 애플리케이션 · 약톡 팀',
    image: 'award-capstone.png'
  },
  {
    date: '2025.07.05',
    title: '한국디지털콘텐츠학회 대학생 논문경진대회 동상',
    description: 'OpenCV와 DUR API를 이용한 복약 도움 애플리케이션',
    image: 'award-conference.png'
  }
];

export const skills = [
  { group: 'Cloud', items: 'AWS EC2 · VPC · EKS · ALB · RDS · Route53' },
  { group: 'Infrastructure as Code', items: 'Terraform · Ansible' },
  { group: 'Container & Orchestration', items: 'Docker · Kubernetes · K3s' },
  { group: 'CI/CD & GitOps', items: 'GitHub Actions · ArgoCD · Git' },
  { group: 'Monitoring', items: 'Prometheus · Grafana · Loki' },
  { group: 'Development', items: 'Python' }
];
