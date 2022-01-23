import { CVStateModel } from '../cv/cv.model';

export interface Content {
  id?: string;
  content: string;
}

export interface Project {
  id?: string;
  title: string;
  descs: string[];
  current: boolean;
  repoLink?: string;
  visitLink?: string;
  highlights?: string[];
  projectCardUrl?: string;
}

export interface Course {
  id?: string;
  title: string;
  certi: string;
  offeredBy: string;
  platform: string;
  courseCardUrl?: string;
}

export interface Specialization {
  id?: string;
  certi: string;
  title: string;
  offeredBy: string;
  platform: string;
  specializationCardUrl?: string;
  courses: { title: string; certi: string }[];
}

export interface RootStateModel {
  isReady: boolean;
  abouts?: Content[];
  projects?: Project[];
  cv?: CVStateModel;
  courses?: Course[];
  specializations?: Specialization[];
}
