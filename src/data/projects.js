
export const projects = [
  {
    id:'ai-sre',
    videos:[
      { title:'DR Failover (서울 → 도쿄)', url:'https://www.youtube.com/watch?v=AlXaMUZ9_as' },
      { title:'DR Failback (도쿄 → 서울)', url:'https://youtu.be/3h2EhsX2h70' },
      { title:'AI-SRE Console 시연', url:'https://youtu.be/tkKEKcThOqg' },
      { title:'Dashboard 시연', url:'https://youtu.be/-wnL1JUMVEE' },
    ],
    title:'AI-SRE Console',
    subtitle:'AI 기반 클라우드 운영 플랫폼',
    period:'2026.04 — 2026.07',
    team:'6명',
    role:'Terraform 기반 AWS 멀티 리전 인프라 구축 및 DR 운영 자동화',
    tags:[
      'AWS',
      'Terraform',
      'GitHub Actions',
      'EKS',
      'Cloudflare'
    ],
    image:'ai-sre-architecture.png',
    intro:'서울·도쿄 멀티 리전 인프라를 코드로 관리하고, DNS Failover 및 복구 검증을 자동화한 클라우드 운영 플랫폼 프로젝트입니다.',
    tasks:[
      'Terraform으로 VPC, EKS, ALB, RDS 인프라 구성',
      'GitHub Actions 운영 및 DR Workflow 구현',
      'Terraform Output 기반 Cluster Name, IAM Role, ALB DNS 자동 조회',
      'Cloudflare DNS Failover 및 복구 검증 자동화'
    ],
    issues:[
      [
        'EKS 재생성 후 Kubernetes 리소스 유실',
        'Terraform이 관리하는 AWS 리소스와 Kubernetes 내부 리소스 관리 범위가 달랐습니다.',
        '기존 Kubernetes Manifest를 재적용해 서비스를 복구하고 관리 범위를 분리했습니다.'
      ],
      [
        'EKS 재생성 후 kubeconfig 불일치',
        '기존 kubeconfig가 삭제된 클러스터의 Endpoint를 참조했습니다.',
        'aws eks update-kubeconfig로 클러스터 정보를 갱신했습니다.'
      ],
      [
        'Cross-Region RDS Read Replica 생성 실패',
        '암호 관리 제약, Provider 설정 충돌 및 도쿄 KMS Key 누락이 있었습니다.',
        '비밀번호 설정을 조정하고 충돌 설정을 제거한 뒤 대상 리전 KMS Key를 지정했습니다.'
      ],
      [
        'DR Health Check HTTP 403',
        'DNS Failover 후 복구 검증 요청이 403을 반환했습니다.',
        'Cloudflare → DNS → ALB → Ingress를 점검하고 /health 예외 규칙과 로그를 추가했습니다.'
      ]
    ],
    results:[
      '서울·도쿄 AWS 멀티 리전 인프라를 Terraform으로 구성',
      'Terraform Output 기반 동적 조회로 운영 Workflow 하드코딩 의존성 감소',
      '사전 점검 → Failover → 복구 검증 → Failback Workflow 연결'
    ],
    links:[
      [
        'Infrastructure Repository',
        'https://github.com/Final-Project-KT-cloud/ai-sre-infra'
      ],
      [
        'Console Repository',
        'https://github.com/Final-Project-KT-cloud/ai-sre-console'
      ]
    ]
  },
  {
    id:'warm-standby',
    videos:[
      { title:'Warm Standby Hybrid Cloud 시연', url:'https://www.youtube.com/watch?v=Bnn1jsPqxek' },
    ],
    title:'Warm Standby Hybrid Cloud',
    subtitle:'하이브리드 클라우드 재해 복구 아키텍처',
    period:'2026.03 — 2026.04',
    team:'6명',
    role:'AWS 인프라 구축 및 Terraform IaC 구현',
    tags:[
      'AWS',
      'Terraform',
      'Route53',
      'EKS',
      'ArgoCD'
    ],

    // 대표 이미지
    image:'architecture-normal.png',

    // 정상 운영 및 장애 발생 아키텍처
    images:[
      {
        title:'정상 운영 (Active)',
        src:'architecture-normal.png'
      },
      {
        title:'장애 발생 (DR Failover)',
        src:'architecture-dr.png'
      }
    ],

    intro:'온프레미스 Active 환경과 AWS Standby 환경을 연결해 장애 시 트래픽을 전환하는 하이브리드 클라우드 DR 프로젝트입니다.',
    tasks:[
      'Terraform 모듈화로 AWS VPC·EKS·ALB 인프라 구성',
      'S3 Backend와 DynamoDB Lock 기반 State 협업 환경 구성',
      'Route53 Health Check와 Failover Routing Policy 검증',
      'ArgoCD 기반 Multi-Cluster 배포 환경 구성'
    ],
    issues:[
      [
        'Terraform State 충돌',
        '여러 환경에서 동일한 State를 참조할 때 변경 충돌 위험이 있었습니다.',
        'S3 Backend와 DynamoDB Lock을 활용해 State 일관성을 관리했습니다.'
      ],
      [
        'ArgoCD Multi-Cluster 동기화 실패',
        'DR 클러스터 인증 및 등록 정보가 맞지 않아 동기화에 실패했습니다.',
        '클러스터를 다시 등록하고 인증 정보를 수정했습니다.'
      ],
      [
        'Route53 DR 전환 검증',
        'Health Check와 DNS 레코드 정책이 함께 올바르게 동작해야 했습니다.',
        'Failover Routing Policy와 Health Check를 연동해 전환을 검증했습니다.'
      ]
    ],
    results:[
      '재사용 가능한 Terraform 모듈 기반 IaC 환경 구축',
      'Warm Standby 기반 서비스 전환 시나리오 검증',
      'GitOps 기반 DR 클러스터 배포 동기화'
    ],
    links:[
      [
        'Infrastructure Repository',
        'https://github.com/Samsisekki/Infra_terraform'
      ]
    ]
  },
  {
    id:'k3s',
    videos:[
      { title:'Terraform 기반 AWS 인프라 구축 및 환경 구성', url:'https://youtu.be/Y09y9DsHU0Q' },
      { title:'Docker 이미지 변경 및 K3s 자동 배포', url:'https://youtu.be/r1qkYslJg9o' },
    ],
    title:'AWS K3s Infrastructure',
    subtitle:'Terraform · Ansible · GitHub Actions 자동화',
    period:'2026.01 — 2026.03',
    team:'5명',
    role:'GitHub Actions CI/CD 및 Private Subnet 배포 자동화',
    tags:[
      'AWS',
      'K3s',
      'Docker',
      'Ansible',
      'GitHub Actions'
    ],
    image:'k3s-architecture.png',
    intro:'AWS 환경에 K3s 클러스터를 구성하고, Git Push부터 Docker 이미지 빌드 및 Private Subnet 배포까지 자동화했습니다.',
    tasks:[
      'GitHub Actions CI/CD Pipeline 구축',
      'Bastion Host에 Self-hosted Runner 구성',
      'Docker 이미지 빌드 및 Docker Hub 배포 자동화',
      'Ansible Playbook을 이용한 Private K3s 노드 배포'
    ],
    issues:[
      [
        'GitHub Actions Playbook 경로 오류',
        'Runner의 Working Directory와 Playbook 실행 경로가 달랐습니다.',
        'working-directory와 파일 경로를 저장소 구조에 맞게 수정했습니다.'
      ],
      [
        'Private Subnet 배포 접근 제한',
        'GitHub Hosted Runner에서 내부 K3s 노드에 직접 접근할 수 없었습니다.',
        'Bastion Host의 Self-hosted Runner와 Ansible을 이용해 내부 노드에 배포했습니다.'
      ]
    ],
    results:[
      'Git Push 이후 Docker Build와 배포 작업 자동화',
      'Private 서버를 외부에 노출하지 않고 배포 환경 구성',
      'GitHub Actions와 Ansible 연계 운영 경험 확보'
    ],
    links:[
      [
        'Terraform Repository',
        'https://github.com/KT-Cloud-2nd-Team5/aws-k8s-terraform-4weeks'
      ],
      [
        'Ansible Repository',
        'https://github.com/KT-Cloud-2nd-Team5/aws-k8s-ansible-4weeks'
      ]
    ]
  },
  {
    id:'dur',
    title:'DUR API 복약 관리 서비스',
    subtitle:'공공데이터 기반 복약 정보 애플리케이션',
    period:'2025.06 — 2025.11',
    team:'팀 프로젝트',
    role:'DUR API 연동 및 프론트엔드 개발',
    tags:[
      'Java',
      'Spring Boot',
      'MySQL',
      'React Native',
      'DUR API'
    ],
    image:'dur-architecture.png',
    intro:'공공데이터 DUR API를 활용해 의약품 정보를 조회하고 복약 이력을 관리하는 서비스 프로젝트입니다.',
    tasks:[
      'DUR API 기반 의약품 정보 조회',
      '프론트엔드 화면 및 사용자 복약 정보 조회 기능 구현',
      'Spring Boot REST API 연동',
      'MySQL 데이터 저장·조회 기능 통합'
    ],
    issues:[],
    results:[
      '한신대학교 AI/SW 캡스톤디자인 장려상 (2025.11)',
      '한국디지털콘텐츠학회 대학생 논문경진대회 동상 (2025.07)',
      '공공데이터 API 및 프론트엔드·백엔드 연동 경험'
    ],
    videos:[
      { title:'DUR 복약 관리 애플리케이션 시연', url:'https://youtu.be/1nsi5mLB4s0' }
    ],
    links:[['GitHub Repository', 'https://github.com/medi-talk/Medi_Talk_application.git']]
  }
];
