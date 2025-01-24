export interface Project {
  id: string;
  category: string;
  startDate: string;
  endDate?: string;
  title: string;
  description: string[];
  thumbnail?: string;
  images?: string[];
  url?: {
    link: string;
    deprecated?: boolean;
  };
  team: string;
  skills: string[];
  links: {
    readme?: string;
    github?: string;
  };
  featured?: boolean;
}
