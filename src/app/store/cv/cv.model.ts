interface Content {
  id?: string;
  content: string;
}

interface Definition {
  id?: string;
  title: string;
  desc: string;
}

export interface WorkExperience extends Definition {
  duration: string;
  role: string;
}

export interface Hackathon extends Definition {
  event: string;
}

export interface VolunteerExperience extends Definition {
  roles: string[];
}

export interface CVStateModel {
  resumeUrl: string;
  educations: Content[];
  pors: Definition[];
  techSkills: Definition[];
  hackathons: Hackathon[];
  volunteerExps: VolunteerExperience[];
  workExps: WorkExperience[];
}
