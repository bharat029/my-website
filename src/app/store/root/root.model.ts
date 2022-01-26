import { CVStateModel } from '../cv/cv.model';

export interface Content {
  id?: string;
  content: string;
}

export interface CardContent {
  id?: string;
  title: string;
  cardImageUrl?: string;
}

export interface Project extends CardContent {
  descs: string[];
  current: boolean;
  repoLink?: string;
  visitLink?: string;
  highlights?: string[];
}

export interface Course extends CardContent {
  certificate: string;
  offeredBy: string;
  platform: string;
}

export interface Specialization extends Course {
  courses: { title: string; certificate: string }[];
}

export interface UserData {
  landingSubtitle: string;
  profileImageUrl: string;
  abouts: Content[];
  projects: Project[];
  cv: CVStateModel;
  courses: Course[];
  specializations: Specialization[];
}

export interface RootStateModel extends Partial<UserData> {
  isReady: boolean;
}
