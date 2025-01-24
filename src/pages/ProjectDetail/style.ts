import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xxl} 0`};
  background: ${({ theme }) => theme.colors.background.default};
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.container.lg};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const Category = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
`;

export const Period = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const MetricsList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  strong {
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

export const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.background.paper};
`;

export const ArchitectureImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const MarkdownSection = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.6;

  h1,
  h2,
  h3 {
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  p {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  ul,
  ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }

  code {
    background: ${({ theme }) => theme.colors.background.paper};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
    font-family: monospace;
  }

  pre {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  blockquote {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    border-left: 4px solid ${({ theme }) => theme.colors.border.light};
    background: ${({ theme }) => theme.colors.background.paper};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }

  th,
  td {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border.default};
  }

  th {
    background: ${({ theme }) => theme.colors.background.paper};
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SideSection = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SideTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SkillItem = styled.span`
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ContributorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ContributorItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContributorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ContributorName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ContributorRole = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ContributorLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.lg};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const LinksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.md};

  &:hover {
    background: ${({ theme }) => theme.colors.background.alt};
  }
`;

export const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const RelatedLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.background.default};
  }
`;
