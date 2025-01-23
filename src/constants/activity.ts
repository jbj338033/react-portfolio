import { HiOutlineAcademicCap } from "react-icons/hi";
import { Activity } from "../types/activity";
import { BsLink45Deg } from "react-icons/bs";

export const ACTIVITIES: Activity[] = [
  {
    category: "교내 활동",
    icon: HiOutlineAcademicCap,
    details: [
      {
        title: "24 나르샤 프로젝트",
        startDate: "2024.08.20",
        endDate: "2024.12.10",
        description: [
          "교내 IT 프로젝트 동아리 나르샤에서 진행한 화상 채팅 서비스 'TokTok' 개발",
          "풀스택 개발을 담당하여 프론트엔드와 백엔드 전반적인 개발 진행",
          "Express와 Socket.io를 활용한 실시간 화상 채팅 서버 구현",
          "WebRTC 기술을 이용한 P2P 화상 통화 기능 개발",
          "AWS EC2를 활용한 서버 배포 및 인프라 구축",
          "Git을 통한 버전 관리 및 팀원들과의 협업 진행",
        ],
        skills: [
          "Node.js",
          "Express",
          "Socket.io",
          "React",
          "AWS",
          "WebRTC",
          "TypeScript",
          "Git",
        ],
      },
      {
        title: "자료구조 스터디",
        startDate: "2024.09.11",
        description: [
          "10명 규모의 알고리즘 스터디 리더로서 주간 커리큘럼 설계 및 운영",
          "매주 백준 골드 수준의 알고리즘 문제 5개 선정 및 해설",
          "스택, 큐, 트리 등 핵심 자료구조 이론 강의 및 실전 문제 풀이",
          "코딩 테스트 대비 시간 복잡도 분석 및 최적화 전략 연구",
          "팀원들의 코드 리뷰 및 피드백 제공으로 문제 해결 능력 향상 도모",
        ],
        skills: ["Python", "Algorithm", "Data Structure"],
      },
    ],
  },
  {
    category: "대외 활동",
    icon: BsLink45Deg,
    details: [
      {
        title: "해커그라운드",
        startDate: "2024.08.25",
        endDate: "2024.08.27",
        description: [
          "의성군에서 주최한 72시간 해커톤 대회 '해커그라운드'에 참가했습니다.",
          "대구소프트웨어마이스터고 친구들과 건국대학교 학생으로 구성된 4인 팀을 이뤄 프로젝트를 진행했습니다.",
          "프로젝트의 백엔드 개발을 전담하여 REST API 설계 및 구현, 데이터베이스 모델링을 담당했습니다.",
          "농촌 정착을 돕는 서비스 '굿팜(GoodFarm)'을 개발하여 귀농·귀촌인들의 안정적인 정착을 지원했습니다.",
          "Express와 MongoDB를 활용한 서버 아키텍처 설계 및 구현으로 실시간 데이터 처리 시스템을 구축했습니다.",
          "팀원들과의 긴밀한 협업을 통해 제한된 시간 내에 MVP를 성공적으로 완성했습니다.",
        ],
        skills: ["React", "Spring Boot", "JPA", "MySQL", "JWT", "Git"],
        achievements: [
          "72시간이라는 제한된 시간 내에 완성도 있는 서비스 구현",
          "실시간 데이터 처리가 가능한 안정적인 서버 아키텍처 설계",
          "팀 내 효율적인 협업 경험 습득",
        ],
        role: "백엔드 개발 리드",
        teamSize: 4,
      },
    ],
  },
];
