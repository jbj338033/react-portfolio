import { memo, useCallback, useMemo } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { IoArrowBack } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as S from "./style";
import { Project } from "../../types/project";

interface Contributor {
  name: string;
  role: string;
  github?: string;
}

interface ProjectDetails extends Project {
  overview: string;
  contributors: Contributor[];
  challenges: string;
  solutions: string;
  architectureImage?: string;
  futureImprovements?: string;
  relatedProjects?: {
    title: string;
    link: string;
  }[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

const DUMMY_PROJECTS: ProjectDetails[] = [
  {
    id: "solve",
    title: "포트폴리오 플랫폼",
    category: "웹 애플리케이션",
    startDate: "2024-01",
    endDate: "2024-03",
    thumbnail: "/images/portfolio.jpg",
    images: [
      "/images/portfolio1.jpg",
      "/images/portfolio2.jpg",
      "/images/portfolio3.jpg",
    ],
    description: [
      "Next.js와 TypeScript를 활용한 현대적인 포트폴리오 플랫폼",
      "Server-side Rendering과 최적화된 이미지 처리로 빠른 페이지 로딩",
      "SEO 최적화 및 Google Analytics를 통한 사용자 행동 분석",
      "다크모드 지원 및 반응형 디자인으로 사용자 경험 향상",
    ],
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
    ],
    featured: true,
    team: "개인 프로젝트",
    links: {
      github: "https://github.com/username/portfolio",
      readme: "https://github.com/username/portfolio#readme",
    },
    url: { link: "https://portfolio-demo.com" },
    overview: `
# 프로젝트 개요

Next.js와 TypeScript를 기반으로 개발된 현대적인 포트폴리오 플랫폼입니다. 사용자 경험을 최우선으로 고려하여 설계되었으며, 
최신 웹 기술들을 적극 활용하였습니다.

## 주요 기능
- SSR을 통한 빠른 초기 로딩 및 SEO 최적화
- 이미지 최적화 및 지연 로딩 구현
- 다크모드 지원 및 테마 커스터마이징
- 반응형 디자인으로 모든 디바이스 지원
- 애니메이션 효과로 인터랙티브한 사용자 경험
- 마크다운 지원으로 풍부한 컨텐츠 작성
   `,
    contributors: [
      {
        name: "홍길동",
        role: "프론트엔드 개발자",
        github: "https://github.com/gildong",
      },
    ],
    challenges: `
## 기술적 도전 과제

### 성능 최적화
- 대용량 이미지 처리로 인한 초기 로딩 속도 저하
- 클라이언트 사이드 렌더링으로 인한 SEO 문제
- 다양한 디바이스에서의 일관된 사용자 경험 제공

### 코드 품질
- TypeScript 도입에 따른 타입 시스템 설계
- 재사용 가능한 컴포넌트 설계
- 상태 관리 복잡도 증가
   `,
    solutions: `
## 해결 방안

### 성능 최적화
- Next.js Image 컴포넌트를 활용한 이미지 최적화
- Code Splitting과 Dynamic Import를 통한 번들 사이즈 최적화
- React.memo와 useMemo를 활용한 렌더링 최적화

### 아키텍처 개선
- Atomic Design Pattern 도입으로 컴포넌트 재사용성 향상
- Custom Hook을 통한 비즈니스 로직 분리
- 모듈형 CSS 도입으로 스타일 관리 용이성 증대
   `,
    architectureImage: "/images/architecture1.png",
    futureImprovements: `
## 향후 개선 계획

### 기능 개선
- 국제화(i18n) 지원 추가
- 사용자 맞춤형 테마 기능
- 소셜 미디어 통합

### 기술 스택 개선
- 마이크로 프론트엔드 아키텍처 도입 검토
- WebAssembly를 활용한 성능 최적화
- PWA 지원 추가
   `,
    metrics: [
      { label: "성능 점수", value: "98/100" },
      { label: "사용자 수", value: "5,000+" },
      { label: "GitHub Stars", value: "120+" },
    ],
    relatedProjects: [
      { title: "개인 블로그", link: "/projects/blog" },
      { title: "대시보드", link: "/projects/dashboard" },
    ],
  },
  {
    id: "project-2",
    title: "실시간 협업 플랫폼",
    category: "실시간 웹 서비스",
    startDate: "2023-09",
    endDate: "2024-01",
    thumbnail: "/images/collab.jpg",
    images: ["/images/collab1.jpg", "/images/collab2.jpg"],
    description: [
      "Socket.io를 활용한 실시간 협업 기능 구현",
      "WebRTC를 이용한 화상 회의 시스템 개발",
      "AWS 인프라 구축 및 CI/CD 파이프라인 구성",
      "MongoDB를 활용한 실시간 데이터 동기화",
    ],
    skills: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB", "AWS"],
    featured: true,
    team: "팀 프로젝트 (4인)",
    links: {
      github: "https://github.com/team/collab",
      readme: "https://github.com/team/collab#readme",
    },
    url: { link: "https://collab-platform.com" },
    overview: `
# 프로젝트 소개

기업용 실시간 협업 플랫폼으로, 화상 회의, 실시간 문서 공유, 채팅 등 다양한 협업 기능을 제공합니다.

## 핵심 기능
- WebRTC 기반 화상 회의
- 실시간 문서 공동 편집
- 채팅 및 파일 공유
- 작업 진행 상황 대시보드
- 권한 기반 접근 제어
   `,
    contributors: [
      {
        name: "김철수",
        role: "프론트엔드 리드",
        github: "https://github.com/chulsoo",
      },
      {
        name: "이영희",
        role: "백엔드 개발자",
        github: "https://github.com/younghee",
      },
    ],
    challenges: `
## 주요 도전 과제

### 실시간 처리
- 다중 사용자 동시 편집 시 충돌 해결
- 대규모 접속자 처리를 위한 서버 확장성
- 네트워크 지연 및 오류 처리

### 보안
- 엔드-투-엔드 암호화 구현
- GDPR 준수를 위한 데이터 처리
   `,
    solutions: `
## 문제 해결

### 기술적 해결 방안
- Operational Transform 알고리즘 도입
- Redis pub/sub을 활용한 서버 간 동기화
- WebRTC ICE 서버 최적화

### 인프라 구성
- AWS ECS를 활용한 컨테이너 오케스트레이션
- CloudFront CDN을 통한 글로벌 서비스 제공
   `,
    architectureImage: "/images/architecture2.png",
    futureImprovements: `
## 개선 계획

### 기능 확장
- AI 기반 회의록 자동 생성
- 다국어 실시간 번역 기능
- 모바일 앱 개발

### 성능 개선
- WebAssembly 도입 검토
- Edge Computing 활용 방안 연구
   `,
    metrics: [
      { label: "동시 접속자", value: "1,000+" },
      { label: "일 사용자", value: "3,000+" },
      { label: "가용성", value: "99.9%" },
    ],
    relatedProjects: [
      { title: "화상회의 시스템", link: "/projects/meeting" },
      { title: "문서관리 시스템", link: "/projects/docs" },
    ],
  },
  {
    id: "project-3",
    title: "AI 기반 학습 플랫폼",
    category: "교육 테크",
    startDate: "2023-12",
    thumbnail: "/images/edu.jpg",
    images: ["/images/edu1.jpg", "/images/edu2.jpg", "/images/edu3.jpg"],
    description: [
      "자연어 처리 기술을 활용한 맞춤형 학습 콘텐츠 제공",
      "머신러닝 기반 학습자 수준 진단 및 추천 시스템",
      "실시간 피드백 및 학습 진도 분석",
      "게이미피케이션 요소를 통한 학습 동기 부여",
    ],
    skills: [
      "Python",
      "FastAPI",
      "React",
      "TensorFlow",
      "PostgreSQL",
      "Docker",
    ],
    featured: true,
    team: "스타트업 (팀 프로젝트)",
    links: {
      github: "https://github.com/company/eduai",
      readme: "https://github.com/company/eduai#readme",
    },
    url: { link: "https://eduai-platform.com" },
    overview: `
# 서비스 개요

AI 기술을 활용하여 개인화된 학습 경험을 제공하는 교육 플랫폼입니다.

## 핵심 기능
- AI 기반 학습자 수준 진단
- 맞춤형 학습 콘텐츠 추천
- 실시간 학습 분석 대시보드
- interactive 학습 콘텐츠
- 게이미피케이션 요소
   `,
    contributors: [
      {
        name: "박민수",
        role: "ML 엔지니어",
        github: "https://github.com/minsu",
      },
      {
        name: "정지원",
        role: "풀스택 개발자",
        github: "https://github.com/jiwon",
      },
    ],
    challenges: `
## 해결 과제

### AI/ML
- 학습자 수준 정확한 진단
- 개인화된 콘텐츠 추천 알고리즘
- 실시간 피드백 시스템

### 시스템 설계
- 대용량 학습 데이터 처리
- 실시간 분석 처리
- 확장 가능한 아키텍처
   `,
    solutions: `
## 해결 방안

### AI 모델 최적화
- 트랜스포머 모델 활용한 텍스트 분석
- 협업 필터링과 컨텐츠 기반 필터링 결합
- 강화학습 모델을 통한 추천 시스템 개선

### 시스템 아키텍처
- 마이크로서비스 아키텍처 도입
- Apache Kafka를 활용한 실시간 데이터 처리
- Redis 캐싱으로 성능 최적화
   `,
    architectureImage: "/images/architecture3.png",
    futureImprovements: `
## 향후 계획

### AI/ML
- 딥러닝 모델 고도화
- 음성 인식 기능 추가
- 실시간 학습 패턴 분석

### 플랫폼 확장
- 모바일 앱 개발
- 교육기관 연계 시스템
- 학부모 모니터링 기능
   `,
    metrics: [
      { label: "활성 사용자", value: "2,000+" },
      { label: "학습 시간", value: "50,000+ hrs" },
      { label: "만족도", value: "4.8/5.0" },
    ],
    relatedProjects: [
      { title: "학습 분석 시스템", link: "/projects/analysis" },
      { title: "콘텐츠 관리 시스템", link: "/projects/cms" },
    ],
  },
];

const MarkdownRenderer = memo(({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      code(props) {
        const { className, children } = props;
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
          <SyntaxHighlighter
            PreTag="div"
            language={match[1]}
            style={vscDarkPlus}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className}>{children}</code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
));

MarkdownRenderer.displayName = "MarkdownRenderer";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = useMemo(() => {
    return DUMMY_PROJECTS.find((p) => p.id === projectId) || null;
  }, [projectId]);

  const handleBack = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  if (!project) return <Navigate to="/projects" />;

  return (
    <S.Container>
      <S.Inner>
        <S.BackButton onClick={handleBack}>
          <IoArrowBack /> Back to Projects
        </S.BackButton>

        <S.Header>
          <S.Category>{project.category}</S.Category>
          <S.Title>{project.title}</S.Title>
          <S.ProjectMeta>
            <S.Period>
              <SlCalender />
              <time dateTime={project.startDate}>{project.startDate}</time>
              {" ~ "}
              {project.endDate ? (
                <time dateTime={project.endDate}>{project.endDate}</time>
              ) : (
                "진행중"
              )}
            </S.Period>
            <S.MetricsList>
              {project.metrics?.map((metric) => (
                <S.MetricItem key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                </S.MetricItem>
              ))}
            </S.MetricsList>
          </S.ProjectMeta>
        </S.Header>

        <S.Content>
          <S.MainSection>
            <S.ImageGallery>
              {project.images?.map((image, index) => (
                <S.ProjectImage
                  key={index}
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                />
              ))}
            </S.ImageGallery>

            <S.MarkdownSection>
              <MarkdownRenderer content={project.overview} />
            </S.MarkdownSection>

            {project.architectureImage && (
              <S.ArchitectureImage
                src={project.architectureImage}
                alt="Project Architecture"
              />
            )}

            <S.MarkdownSection>
              <MarkdownRenderer content={project.challenges} />
              <MarkdownRenderer content={project.solutions} />
              {project.futureImprovements && (
                <MarkdownRenderer content={project.futureImprovements} />
              )}
            </S.MarkdownSection>
          </S.MainSection>

          <S.Sidebar>
            <S.SideSection>
              <S.SideTitle>Tech Stack</S.SideTitle>
              <S.SkillsList>
                {project.skills.map((skill) => (
                  <S.SkillItem key={skill}>{skill}</S.SkillItem>
                ))}
              </S.SkillsList>
            </S.SideSection>

            <S.SideSection>
              <S.SideTitle>Contributors</S.SideTitle>
              <S.ContributorsList>
                {project.contributors.map((contributor) => (
                  <S.ContributorItem key={contributor.name}>
                    <S.ContributorInfo>
                      <S.ContributorName>{contributor.name}</S.ContributorName>
                      <S.ContributorRole>{contributor.role}</S.ContributorRole>
                    </S.ContributorInfo>
                    {contributor.github && (
                      <S.ContributorLink
                        href={contributor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsGithub />
                      </S.ContributorLink>
                    )}
                  </S.ContributorItem>
                ))}
              </S.ContributorsList>
            </S.SideSection>

            <S.SideSection>
              <S.SideTitle>Links</S.SideTitle>
              <S.LinksList>
                {project.url && (
                  <S.LinkButton
                    href={project.url.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGlobe /> Live Demo
                  </S.LinkButton>
                )}
                {project.links.github && (
                  <S.LinkButton
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub /> Repository
                  </S.LinkButton>
                )}
              </S.LinksList>
            </S.SideSection>

            {project.relatedProjects && (
              <S.SideSection>
                <S.SideTitle>Related Projects</S.SideTitle>
                <S.RelatedList>
                  {project.relatedProjects.map((related) => (
                    <S.RelatedLink key={related.title} to={related.link}>
                      {related.title}
                    </S.RelatedLink>
                  ))}
                </S.RelatedList>
              </S.SideSection>
            )}
          </S.Sidebar>
        </S.Content>
      </S.Inner>
    </S.Container>
  );
};

export default memo(ProjectDetail);
