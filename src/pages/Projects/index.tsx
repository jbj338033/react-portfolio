import { useState, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { Project } from "../../types/project";
import { PROJECTS } from "../../constants/project";

interface ProjectCardProps {
  project: Project;
  onViewDetail: (project: Project) => void;
}

const Period = memo(
  ({ startDate, endDate }: { startDate: string; endDate?: string }) => (
    <S.Period>
      <SlCalender aria-hidden="true" />
      <time dateTime={startDate}>{startDate}</time>
      {" ~ "}
      {endDate ? <time dateTime={endDate}>{endDate}</time> : "진행중"}
    </S.Period>
  )
);

const ProjectCard = memo(({ project, onViewDetail }: ProjectCardProps) => (
  <S.ProjectCard
    onClick={() => onViewDetail(project)}
    tabIndex={0}
    role="button"
    aria-label={`${project.title} 자세히 보기`}
  >
    <S.ProjectContent>
      <S.ProjectHeader>
        <S.Category>{project.category}</S.Category>
        <Period startDate={project.startDate} endDate={project.endDate} />
      </S.ProjectHeader>

      <S.ProjectTitle>{project.title}</S.ProjectTitle>
      <S.ProjectTeam>{project.team}</S.ProjectTeam>

      <S.ProjectImage>
        {project.thumbnail && <img src={project.thumbnail} alt="" />}
      </S.ProjectImage>

      <S.ProjectDescription>
        {project.description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </S.ProjectDescription>

      <S.ProjectFooter>
        <S.SkillsList>
          {project.skills.map((skill) => (
            <S.SkillItem key={skill}>{skill}</S.SkillItem>
          ))}
        </S.SkillsList>

        <S.Links>
          {project.url && (
            <S.LinkIcon
              href={project.url.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGlobe aria-label="Live Demo" />
            </S.LinkIcon>
          )}
          {project.links.github && (
            <S.LinkIcon
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub aria-label="GitHub Repository" />
            </S.LinkIcon>
          )}
        </S.Links>
      </S.ProjectFooter>
    </S.ProjectContent>
  </S.ProjectCard>
));

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = PROJECTS.map((p) => p.category);
    return ["all", ...new Set(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const handleViewDetail = useCallback(
    (project: Project) => {
      navigate(`/projects/${project.id}`);
    },
    [navigate]
  );

  return (
    <S.Container>
      <S.Inner>
        <S.Header>
          <S.Title>프로젝트</S.Title>
          <S.Description>
            지금까지 진행한 다양한 프로젝트들을 소개합니다
          </S.Description>
        </S.Header>

        <S.CategoryFilter>
          {categories.map((category) => (
            <S.FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </S.FilterButton>
          ))}
        </S.CategoryFilter>

        <S.ProjectsGrid>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetail={handleViewDetail}
            />
          ))}
        </S.ProjectsGrid>
      </S.Inner>
    </S.Container>
  );
};

export default memo(Projects);
