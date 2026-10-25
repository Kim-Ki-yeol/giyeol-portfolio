// 실제 포트폴리오에 기재된 문제/원인/해결/결과를 기준으로 작성했습니다.
// 명령어와 로그는 확인된 것만 넣고, 예시를 실제 실행 기록처럼 표시하지 않습니다.
export const troubleshooting = {
  'ai-sre': [
    {
      title: 'EKS 재생성 후 Kubernetes 리소스 유실',
      problem: '도쿄 리전 EKS 클러스터를 재생성한 후 기존 애플리케이션의 Namespace, Deployment, Service, Ingress가 사라져 서비스가 중단되었습니다.',
      cause: 'Terraform으로 관리하던 대상은 주로 AWS 인프라 리소스였고, Kubernetes 클러스터 내부의 애플리케이션 리소스는 별도의 배포 범위에 있었습니다. 클러스터를 교체하면서 내부 리소스가 함께 초기화되었습니다.',
      solution: '기존에 사용하던 Kubernetes Manifest를 새 클러스터에 다시 적용해 애플리케이션을 재배포했습니다. AWS 인프라의 생성과 클러스터 내부 애플리케이션 배포는 별도로 관리해야 한다는 점을 운영 절차에 반영했습니다.',
      result: '애플리케이션 서비스를 복구했으며, 인프라 재생성 시 Kubernetes 리소스를 다시 배포해야 한다는 복구 절차를 정리했습니다.',
      lesson: 'IaC가 관리하는 리소스 범위를 명확히 정의하고, 클러스터 재생성 후 애플리케이션 복구까지 고려해야 합니다.'
    },
    {
      title: 'EKS 재생성 후 kubeconfig 정보 불일치',
      problem: 'EKS 클러스터 재생성 이후 kubectl 명령으로 새 클러스터에 접근할 수 없었습니다.',
      cause: '로컬 kubeconfig에 삭제된 EKS 클러스터의 API Endpoint 정보가 남아 있어 새 클러스터 연결 정보와 일치하지 않았습니다.',
      solution: 'AWS CLI의 aws eks update-kubeconfig 명령으로 새 EKS 클러스터의 접속 정보를 갱신했습니다. 이후 재생성 작업에서는 kubeconfig 갱신을 먼저 확인하도록 절차를 정리했습니다.',
      result: 'kubectl을 통한 클러스터 접근을 정상화했습니다.',
      lesson: '클러스터를 다시 만들면 인프라 리소스뿐 아니라 운영 도구의 연결 설정도 갱신해야 합니다.',
      command: 'aws eks update-kubeconfig --region <AWS_REGION> --name <CLUSTER_NAME>'
    },
    {
      title: 'PostgreSQL Cross-Region Read Replica 생성 실패',
      problem: '서울 Primary RDS를 바탕으로 도쿄 리전의 Read Replica를 생성하는 Terraform Apply 단계에서 오류가 발생했습니다.',
      cause: 'Secrets Manager 자동 비밀번호 관리 방식의 제약, Terraform Provider 설정 간 충돌, 대상 리전의 KMS Key 미지정이 복합적으로 영향을 주었습니다.',
      solution: '비밀번호 관리 방식을 Password 방식으로 조정하고 충돌하는 설정을 제거했습니다. 또한 도쿄 리전에서 사용할 KMS Key를 명시해 Cross-Region 암호화 조건을 맞췄습니다.',
      result: 'Read Replica 생성에 필요한 인증·암호화 조건을 충족하는 인프라 구성을 완료했습니다.',
      lesson: '멀티 리전 데이터베이스는 소스와 대상 리전의 Provider 및 KMS 설정을 함께 점검해야 합니다.'
    },
    {
      title: 'DR Health Check 요청에서 HTTP 403 발생',
      problem: 'DNS Failover 이후 복구 여부를 확인하는 Health Check 요청이 HTTP 403을 반환해 서비스 복구 검증과 RTO 측정이 어려웠습니다.',
      cause: '초기에는 Cloudflare WAF 차단을 의심했지만 Security Events에서 차단 기록이 확인되지 않았습니다. 따라서 Cloudflare, DNS, ALB, Ingress로 이어지는 요청 경로를 단계별로 점검해야 했습니다.',
      solution: 'Cloudflare부터 DNS, ALB, Ingress까지 요청 흐름을 순서대로 확인하고 /health 경로의 예외 규칙 및 로그를 추가해 원인 확인과 복구 검증이 가능하도록 개선했습니다.',
      result: 'DR 복구 검증 및 RTO 측정 로직을 안정화하고, 문제가 발생한 구간을 더 빠르게 확인할 수 있는 운영 구조로 개선했습니다.',
      lesson: '403 응답만으로 WAF를 원인으로 단정하지 않고, 실제 요청이 통과하는 계층을 나눠 확인해야 합니다.'
    }
  ],
  'warm-standby': [
    {
      title: 'Terraform State 충돌 및 동기화 문제',
      problem: '팀원과 여러 환경에서 Terraform Apply를 실행할 때 동일한 State를 참조하면서 인프라 변경이 충돌할 가능성이 있었습니다.',
      cause: '로컬 State 파일로 협업하면 작업 시점마다 서로 다른 상태를 참조할 수 있어 최신 인프라 상태를 일관되게 보장하기 어렵습니다.',
      solution: 'S3 Backend로 State 파일을 중앙 관리하고 DynamoDB Lock을 활용해 동시에 여러 변경 작업이 실행되지 않도록 구성했습니다.',
      result: 'Terraform State의 일관성을 확보하고 협업 환경에서 인프라 변경 충돌 위험을 줄였습니다.',
      lesson: 'Terraform 코드뿐 아니라 State 관리 전략도 협업형 IaC 환경의 핵심입니다.'
    },
    {
      title: 'ArgoCD Multi-Cluster 등록 및 동기화 실패',
      problem: 'DR EKS 클러스터를 ArgoCD에 연결할 때 인증과 애플리케이션 동기화가 정상적으로 진행되지 않았습니다.',
      cause: 'DR 클러스터의 인증 정보와 Cluster Registration 상태가 올바르지 않아 GitOps 동기화가 실패했습니다.',
      solution: 'DR 클러스터를 ArgoCD에 다시 등록하고 인증 정보를 수정하여 Multi-Cluster 동기화를 완료했습니다.',
      result: 'Primary와 DR 클러스터에 동일한 애플리케이션 상태를 유지할 수 있는 GitOps 운영 환경을 구성했습니다.',
      lesson: 'DR 전환을 준비할 때 인프라뿐 아니라 애플리케이션 배포 상태와 클러스터 인증도 함께 확인해야 합니다.'
    },
    {
      title: 'Route53 기반 DR Failover 동작 검증',
      problem: 'Primary 장애 시 DR 환경으로 트래픽이 자동 전환되는지 검증해야 했습니다.',
      cause: 'DNS Failover는 Health Check 상태와 Failover Routing Policy가 올바르게 연결되어야 정상 동작합니다.',
      solution: 'Route53 Health Check와 Failover Routing Policy를 연동해 Primary 장애 상황에서 DR 환경으로 트래픽이 전환되도록 설정했습니다.',
      result: '장애 시나리오에서 DR 환경으로의 트래픽 전환을 확인했습니다.',
      lesson: 'DR 설계에서는 설정 완료 여부뿐 아니라 실제 장애 상황의 동작 검증이 중요합니다.'
    }
  ],
  k3s: [
    {
      title: 'GitHub Actions에서 Ansible Playbook 경로 오류',
      problem: 'Self-hosted Runner에서 CI/CD Workflow가 실행됐지만 Ansible Playbook 파일을 찾지 못해 배포가 실패했습니다.',
      cause: 'Runner의 기본 Working Directory와 Workflow에서 참조하는 Playbook 경로가 실제 저장소 디렉터리 구조와 일치하지 않았습니다.',
      solution: 'GitHub Actions의 working-directory와 Ansible Playbook 실행 경로를 저장소의 실제 파일 위치에 맞게 수정했습니다.',
      result: 'GitHub Actions와 Ansible을 연계한 K3s 자동 배포 Workflow가 정상 실행되도록 수정했습니다.',
      lesson: 'Self-hosted Runner에서는 실행 위치와 파일 경로를 명시적으로 확인해야 합니다.'
    },
    {
      title: 'Private Subnet K3s 서버 접근 제한',
      problem: 'GitHub Hosted Runner에서 Private Subnet의 K3s Master 및 Worker 노드에 직접 접근할 수 없어 자동 배포가 진행되지 않았습니다.',
      cause: 'Private Subnet의 서버는 외부 인터넷에서 직접 접근할 수 없으므로 내부 네트워크에 접근할 수 있는 배포 실행 지점이 필요했습니다.',
      solution: 'Public Subnet의 Bastion Host에 Self-hosted Runner를 구성하고, 해당 Runner에서 Ansible을 실행해 Private Subnet의 K3s 노드로 배포하도록 경로를 변경했습니다.',
      result: 'Private 서버를 외부에 직접 노출하지 않으면서 GitHub Actions 기반 자동 배포를 구현했습니다.',
      lesson: '배포 파이프라인을 설계할 때 네트워크 경계와 실행 주체의 위치를 함께 고려해야 합니다.'
    }
  ],
  // dur: [
  //   {
  //     title: '메모리 누수로 인한 애플리케이션 강제 종료',
  //     problem: 'DUR 복약 관리 애플리케이션 실행 중 메모리 누수가 발생해 앱이 비정상 종료되는 문제가 있었습니다.',
  //     cause: '메모리 누수가 앱 종료와 관련된 문제로 확인되었습니다. 구체적인 누수 지점과 재현 조건은 추가 기록이 필요합니다.',
  //     solution: '메모리 누수 문제를 수정해 앱이 강제 종료되는 현상을 해결했습니다. 수정한 코드 위치와 적용 방법은 확인 가능한 개발 기록을 바탕으로 보완할 예정입니다.',
  //     result: '메모리 누수로 인한 앱 종료 문제를 해결했습니다.',
  //     lesson: '모바일 앱에서는 화면 및 리소스의 생명주기와 메모리 사용을 점검하는 것이 중요합니다.'
  //   }
  // ]
};
