# 김기열 Cloud / DevOps 포트폴리오 V2

## 실행

```powershell
npm install
npm run dev
```

터미널에 출력된 주소(보통 http://localhost:5173)로 접속합니다.

## 파일 구조

- `src/main.js`: 페이지 라우팅 및 프로젝트 필터
- `src/pages/`: 홈, 소개, 프로젝트 목록, 프로젝트 상세, 기술 스택, 경험, 연락처
- `src/data/projects.js`: 프로젝트 정보와 GitHub 링크
- `src/data/troubleshooting.js`: 프로젝트별 문제·원인·해결·결과·배운 점
- `src/data/profile.js`: 이름, 이메일, 기술 스택, 학력, 상장 정보
- `src/components/layout.js`: 공통 헤더/푸터
- `style.css`: 디자인과 반응형 레이아웃
- `assets/`: 증명사진, 아키텍처, 상장 이미지

## 이미지 교체

- 증명사진: `assets/profile-photo.jpg`에 같은 이름으로 덮어쓰기
- 아키텍처: `assets/ai-sre-architecture.png`, `warm-standby-architecture.png`, `k3s-architecture.png`, `dur-architecture.png`
- 상장: `assets/award-capstone.png`, `assets/award-conference.png`

파일 이름을 바꾸면 `src/data/profile.js` 또는 `src/data/projects.js`의 이미지 경로도 수정하세요.

## 디자인 및 내용

- PC 프로젝트 목록은 **2열 × 2행**으로 배치합니다. 모바일에서는 1열입니다.
- 각 프로젝트 카드 클릭 시 **별도 상세 화면**으로 이동합니다.
- 트러블슈팅은 클릭 없이 **모든 내용이 펼쳐져 표시**됩니다.
- 트러블슈팅은 제공된 포트폴리오 자료를 바탕으로 작성했습니다. 실제 로그/명령어가 없는 경우 임의로 만들어 넣지 않았습니다.
- 학력/교육은 최신 시작일순으로 정렬했습니다.
- 상장 이미지는 사용자가 제공한 PDF에서 추출했습니다.
- 증명사진은 제공된 이력서 PDF에 포함된 사진을 추출했습니다.
- 이력서 원본과 연락처 전화번호는 사이트에 포함하지 않았습니다. 공개 전 개인정보를 확인하세요.

## 배포

GitHub Pages Workflow는 `.github/workflows/deploy.yml`에 포함되어 있습니다. GitHub 저장소 설정에서 Pages 소스를 GitHub Actions로 지정하면 됩니다.

## 주의

README의 예시나 코드에 있는 `<AWS_REGION>` 등의 표기는 실제 환경에 맞게 수정해야 합니다.
