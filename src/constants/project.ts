import { Project } from "../types/project";
import openmusic from "../assets/images/openmusic.png";
import background from "../assets/images/background.jpg";
import juniorDeveloper from "../assets/images/junior-developer.png";
import solveTitle from "../assets/images/solve-title.png";
import stompilot from "../assets/images/stompilot.png";
import finder from "../assets/images/finder.png";

export const PROJECTS: Project[] = [
  {
    id: "solve",
    category: "코딩 테스트 플랫폼",
    startDate: "2024.10",
    featured: true,
    title: '자유롭게 문제를 출제하고 풀 수 있는 코딩 테스트 플랫폼 "Solve"',
    description: [
      "1학년 학생들을 위한 맞춤형 코딩 테스트 플랫폼 개발",
      "Docker를 활용한 코드 샌드박스 구현으로 안전한 코드 실행 환경 구축",
      "Spring Boot와 JPA를 활용한 문제 출제 및 채점 시스템 개발",
      "GCP Cloud Run을 활용한 서버리스 아키텍처 구현",
      "실시간 채점 결과 확인을 위한 WebSocket 기반 알림 시스템 구현",
      "QueryDSL을 활용한 동적 쿼리 최적화로 문제 검색 기능 고도화",
      "다양한 프로그래밍 언어(Python, Java, C++) 지원을 위한 컴파일러 통합",
    ],
    thumbnail: solveTitle,
    url: {
      link: "https://solve.kr",
    },
    team: "5인 팀 프로젝트",
    skills: [
      "Spring Boot",
      "Docker",
      "JPA",
      "QueryDSL",
      "MySQL",
      "GCP",
      "WebSocket",
      "Redis",
      "Nginx",
    ],
    links: {
      readme: "https://github.com/NameOfTeam/solve-server#readme",
      github: "https://github.com/NameOfTeam/solve-server",
    },
  },
  {
    id: "openmusic",
    category: "음악 플랫폼",
    startDate: "2024.04",
    endDate: "2024.06",
    featured: true,
    title: '사용자가 직접 음악을 올릴 수 있는 음악 플랫폼 "OpenMusic"',
    description: [
      "Spring Boot를 활용한 RESTful API 설계 및 구현",
      "Google Cloud Platform의 Compute Engine을 활용한 서버 인프라 구축",
      "AWS S3와 CloudFront를 연동하여 음원 파일 스토리지 시스템 구현",
      "JDA를 활용한 디스코드 봇 개발로 실시간 에러 로깅 및 모니터링 시스템 구축",
      "JPA와 QueryDSL을 사용한 효율적인 데이터베이스 쿼리 최적화",
      "JWT 기반 사용자 인증 시스템 구현 및 보안 강화",
      "Swagger를 통한 API 문서화로 프론트엔드 팀과의 협업 효율성 향상",
    ],
    thumbnail: openmusic,
    images: [openmusic, background, juniorDeveloper],
    url: {
      link: "https://openmusic.kr",
      deprecated: true,
    },
    team: "6인 팀 프로젝트",
    skills: [
      "Spring Boot",
      "JPA",
      "MySQL",
      "QueryDSL",
      "JWT",
      "JDA",
      "AWS S3",
      "GCP",
      "Swagger",
    ],
    links: {
      readme: "https://github.com/Open3r/openmusic-server",
    },
  },
  {
    id: "stompilot",
    category: "Stomp 테스팅 툴",
    startDate: "2024.09",
    title: 'Stomp 프로토콜을 테스트할 수 있는 툴 "Stompilot"',
    description: [
      "웹소켓 기반의 Stomp 프로토콜 테스트를 위한 데스크톱/웹 애플리케이션 개발",
      "React와 TypeScript를 활용한 직관적인 사용자 인터페이스 구현",
      "Electron 프레임워크를 활용하여 크로스 플랫폼 데스크톱 애플리케이션으로 제작",
      "실시간 메시지 송수신 테스트 및 모니터링 기능 구현",
      "WebSocket 연결 상태 및 Stomp 프레임 분석 기능 개발",
      "사용자 정의 헤더와 페이로드 설정 기능 구현",
      "테스트 히스토리 저장 및 관리 기능 추가",
    ],
    thumbnail: stompilot,
    url: {
      link: "https://stompilot.netlify.app",
    },
    team: "개인 프로젝트",
    skills: [
      "React",
      "TypeScript",
      "Electron",
      "WebSocket",
      "STOMP",
      "Netlify",
      "Jest",
    ],
    links: {
      readme: "https://github.com/jbj338033/stompilot-app#readme",
      github: "https://github.com/jbj338033/stompilot-app",
    },
  },
  {
    id: "finder",
    category: "분실물 찾기 서비스",
    startDate: "2024.06",
    title: '분실물을 찾을 수 있는 서비스 "찾죠?ㅋ"',
    description: [
      "교내 분실물 관리를 위한 통합 플랫폼 개발",
      "Spring Boot 기반의 RESTful API 설계 및 구현",
      "AWS S3를 활용한 이미지 업로드 및 저장 시스템 구축",
      "JPA와 MySQL을 활용한 효율적인 데이터베이스 설계",
      "위치 기반 분실물 검색 기능 구현",
      "FCM을 활용한 분실물 등록/발견 알림 시스템 개발",
      "JWT 기반 사용자 인증 및 권한 관리 시스템 구현",
    ],
    thumbnail: finder,
    url: {
      link: "https://finder.netlify.app",
    },
    team: "동아리 프로젝트",
    skills: [
      "Spring Boot",
      "JPA",
      "MySQL",
      "AWS S3",
      "FCM",
      "JWT",
      "Redis",
      "Swagger",
    ],
    links: {
      readme: "https://github.com/Team-Able/finder-server#readme",
      github: "https://github.com/Team-Able/finder-server",
    },
  },
];
