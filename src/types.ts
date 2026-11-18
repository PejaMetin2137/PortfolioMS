// Shape of src/data/cv.json — TypeScript will flag a typo or missing field in the data.

export interface Project {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  link?: string;
  repo?: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface Education {
  period: string;
  field: string;
  school: string;
  description: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Language {
  name: string;
  level: string;
  percent: number;
}

export interface CV {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  locationFull: string;
  website: string;
  github: string;
  photo: string;
  pdfFile: string;
  about: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  languages: Language[];
  interests: string;
  gdpr: string;
}
