import { Certificate } from "../types/certificate";

export const CERTIFICATES: Certificate[] = [
  {
    name: "Cos Pro 2급",
    organization: "와이비엠넷",
    date: "2024.05",
    number: "24-12345678",
    description: [
      "소프트웨어 개발 실무 역량을 검증하는 민간자격증",
      "알고리즘 구현 및 문제 해결 능력 평가",
      "데이터 구조의 이해와 활용 능력 인증",
      "Python 언어를 사용한 프로그래밍 역량 검증",
      "우수한 성적 취득",
    ].join("\n"),
  },
  {
    name: "정보처리기능사 필기",
    organization: "한국산업인력공단",
    date: "2025.01.23",
    description: "IT 시스템 운영 및 개발 관련 기초 지식 검증",
  },
];
