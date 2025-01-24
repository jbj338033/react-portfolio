import { useState, useCallback, useEffect, memo, useMemo } from "react";
import * as S from "./style";
import { BsGithub } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { VscLock } from "react-icons/vsc";
import { SlCalender } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Project } from "../../../types/project";
import { PROJECTS } from "../../../constants/project";

interface TouchState {
  start: number;
  end: number;
  isDragging: boolean;
  offset: number;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  isFeatured?: boolean;
}

interface ImageSliderProps {
  images: string[];
  title: string;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

interface PeriodProps {
  startDate: string;
  endDate?: string;
}

interface SkillsListProps {
  skills: string[];
  limit?: number;
}

interface ProjectUrlProps {
  url: {
    link: string;
    deprecated?: boolean;
  };
}

const MIN_SWIPE_DISTANCE = 50;
const DESCRIPTION_PREVIEW_LENGTH = 2;
const SKILLS_PREVIEW_LENGTH = 4;

const Period = memo(({ startDate, endDate }: PeriodProps) => (
  <S.Period>
    <SlCalender aria-hidden="true" />
    <time dateTime={startDate}>{startDate}</time>
    {" ~ "}
    {endDate ? <time dateTime={endDate}>{endDate}</time> : "진행중"}
  </S.Period>
));

Period.displayName = "Period";

const SkillsList = memo(({ skills, limit }: SkillsListProps) => {
  const displaySkills = limit ? skills.slice(0, limit) : skills;

  return (
    <S.SkillsList role="list">
      {displaySkills.map((skill) => (
        <S.SkillItem key={skill} role="listitem">
          {skill}
        </S.SkillItem>
      ))}
      {limit && skills.length > limit && (
        <S.SkillItem aria-label={`And ${skills.length - limit} more skills`}>
          +{skills.length - limit}
        </S.SkillItem>
      )}
    </S.SkillsList>
  );
});

SkillsList.displayName = "SkillsList";

const ProjectCard = memo(
  ({ project, onClick, isFeatured }: ProjectCardProps) => (
    <S.ProjectCard
      onClick={() => onClick(project)}
      tabIndex={0}
      role="button"
      aria-label={`View details of ${project.title}`}
      onKeyPress={(e) => e.key === "Enter" && onClick(project)}
    >
      <S.ProjectImage src={project.thumbnail} alt="" loading="lazy" />
      <S.ProjectContent>
        <S.ProjectHeader>
          <S.Category>{project.category}</S.Category>
          <Period startDate={project.startDate} endDate={project.endDate} />
        </S.ProjectHeader>
        <S.ProjectTitle>{project.title}</S.ProjectTitle>
        <S.ProjectDescription role="list">
          {project.description
            .slice(0, isFeatured ? undefined : DESCRIPTION_PREVIEW_LENGTH)
            .map((desc, i) => (
              <li key={i} role="listitem">
                {desc}
              </li>
            ))}
        </S.ProjectDescription>
        <SkillsList
          skills={project.skills}
          limit={isFeatured ? undefined : SKILLS_PREVIEW_LENGTH}
        />
      </S.ProjectContent>
    </S.ProjectCard>
  )
);

ProjectCard.displayName = "ProjectCard";

const ImageSlider = memo(
  ({ images, title, currentIndex, onIndexChange }: ImageSliderProps) => {
    const [touchState, setTouchState] = useState<TouchState>({
      start: 0,
      end: 0,
      isDragging: false,
      offset: 0,
    });

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      setTouchState((prev) => ({
        ...prev,
        start: e.targetTouches[0].clientX,
        end: e.targetTouches[0].clientX,
        isDragging: true,
      }));
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      setTouchState((prev) => {
        if (!prev.isDragging) return prev;
        const end = e.targetTouches[0].clientX;
        return {
          ...prev,
          end,
          offset: prev.start - end,
        };
      });
    }, []);

    const handleTouchEnd = useCallback(() => {
      const { start, end, isDragging } = touchState;
      if (!isDragging) return;

      const distance = start - end;
      if (Math.abs(distance) > MIN_SWIPE_DISTANCE) {
        if (distance > 0 && currentIndex < images.length - 1) {
          onIndexChange(currentIndex + 1);
        } else if (distance < 0 && currentIndex > 0) {
          onIndexChange(currentIndex - 1);
        }
      }

      setTouchState({ start: 0, end: 0, isDragging: false, offset: 0 });
    }, [touchState, currentIndex, images.length, onIndexChange]);

    return (
      <S.ImageContainer>
        <S.ImageTrack
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% - ${
              touchState.offset
            }px))`,
          }}
        >
          {images.map((image, index) => (
            <S.ImageSlide key={index}>
              <img src={image} alt={`${title} screenshot ${index + 1}`} />
            </S.ImageSlide>
          ))}
        </S.ImageTrack>

        {images.length > 1 && (
          <>
            <S.ImageNavigation>
              <S.NavButton
                onClick={() => onIndexChange(currentIndex - 1)}
                disabled={currentIndex === 0}
                aria-label="Previous image"
                className="prev"
              >
                <MdNavigateBefore aria-hidden="true" />
              </S.NavButton>
              <S.NavButton
                onClick={() => onIndexChange(currentIndex + 1)}
                disabled={currentIndex === images.length - 1}
                aria-label="Next image"
                className="next"
              >
                <MdNavigateNext aria-hidden="true" />
              </S.NavButton>
            </S.ImageNavigation>
            <S.ImageIndicator role="tablist" aria-label="Image navigation">
              {images.map((_, idx) => (
                <S.IndicatorDot
                  key={idx}
                  active={idx === currentIndex}
                  onClick={() => onIndexChange(idx)}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Image ${idx + 1} of ${images.length}`}
                />
              ))}
            </S.ImageIndicator>
          </>
        )}
      </S.ImageContainer>
    );
  }
);

ImageSlider.displayName = "ImageSlider";

const ProjectLinks = memo(
  ({ github, readme }: { github?: string; readme?: string }) => (
    <S.ProjectLinks>
      {readme && (
        <S.LinkButton href={readme} target="_blank" rel="noopener noreferrer">
          README
        </S.LinkButton>
      )}
      {github && (
        <S.LinkButton href={github} target="_blank" rel="noopener noreferrer">
          <BsGithub aria-hidden="true" /> GitHub
        </S.LinkButton>
      )}
    </S.ProjectLinks>
  )
);

ProjectLinks.displayName = "ProjectLinks";

const ProjectUrl = memo(({ url }: ProjectUrlProps) => {
  if (url.deprecated) {
    return (
      <S.DeprecatedUrl>
        <VscLock aria-hidden="true" />
        {url.link}
      </S.DeprecatedUrl>
    );
  }

  return (
    <S.DemoLink href={url.link} target="_blank" rel="noopener noreferrer">
      <BiLinkExternal aria-hidden="true" />
      {url.link}
    </S.DemoLink>
  );
});

ProjectUrl.displayName = "ProjectUrl";

const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (project.images && currentImageIndex > 0) {
            setCurrentImageIndex((prev) => prev - 1);
          }
          break;
        case "ArrowRight":
          if (project.images && currentImageIndex < project.images.length - 1) {
            setCurrentImageIndex((prev) => prev + 1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentImageIndex, project.images, onClose]);

  return (
    <S.Modal onClick={onClose} role="dialog" aria-modal="true">
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose} aria-label="Close modal">
          <IoClose aria-hidden="true" />
        </S.CloseButton>
        <S.ModalBody>
          <S.ProjectHeader>
            <S.Category>{project.category}</S.Category>
            <Period startDate={project.startDate} endDate={project.endDate} />
          </S.ProjectHeader>

          <S.ModalTitle>{project.title}</S.ModalTitle>
          {project.team && <S.ProjectTeam>{project.team}</S.ProjectTeam>}

          {project.images && project.images.length > 0 && (
            <ImageSlider
              images={project.images}
              title={project.title}
              currentIndex={currentImageIndex}
              onIndexChange={setCurrentImageIndex}
            />
          )}

          <S.ProjectDescription role="list">
            {project.description.map((desc, i) => (
              <li key={i} role="listitem">
                {desc}
              </li>
            ))}
          </S.ProjectDescription>

          {project.url && <ProjectUrl url={project.url} />}

          <S.SkillsSection>
            <S.SectionTitle>Skills</S.SectionTitle>
            <SkillsList skills={project.skills} />
          </S.SkillsSection>

          <ProjectLinks
            github={project.links.github}
            readme={project.links.readme}
          />
        </S.ModalBody>
      </S.ModalContent>
    </S.Modal>
  );
});

ProjectModal.displayName = "ProjectModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { featuredProjects, regularProjects } = useMemo(
    () => ({
      featuredProjects: PROJECTS.filter((p) => p.featured),
      regularProjects: PROJECTS.filter((p) => !p.featured),
    }),
    []
  );

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <S.Container id="projects">
      <S.Inner>
        <S.Header>
          <S.HeaderContent>
            <S.Title>Projects</S.Title>
            <S.Description>
              개인 프로젝트와 팀 프로젝트를 소개합니다
            </S.Description>
          </S.HeaderContent>

          <S.ViewAll to="/projects">전체 보기</S.ViewAll>
        </S.Header>

        <S.Content>
          {featuredProjects.length > 0 && (
            <S.FeaturedSection>
              <S.SectionTitle>Featured Projects</S.SectionTitle>
              <S.FeaturedGrid>
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onClick={handleProjectSelect}
                    isFeatured
                  />
                ))}
              </S.FeaturedGrid>
            </S.FeaturedSection>
          )}

          {regularProjects.length > 0 && (
            <S.ProjectsSection>
              <S.SectionTitle>Other Projects</S.SectionTitle>
              <S.ProjectsGrid>
                {regularProjects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onClick={handleProjectSelect}
                  />
                ))}
              </S.ProjectsGrid>
            </S.ProjectsSection>
          )}
        </S.Content>
      </S.Inner>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleModalClose} />
      )}
    </S.Container>
  );
};

export default memo(Projects);
