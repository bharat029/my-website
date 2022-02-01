import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutsComponent } from './abouts/abouts.component';
import { AdminComponent } from './admin.component';
import { CoursesComponent } from './courses/courses.component';
import { EducationsComponent } from './educations/educations.component';
import { GeneralComponent } from './general/general.component';
import { HackathonsComponent } from './hackathons/hackathons.component';
import { PorsComponent } from './pors/pors.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { TechSkillsComponent } from './tech-skills/tech-skills.component';
import { VolunteerExpsComponent } from './volunteer-exps/volunteer-exps.component';
import { WorkExpsComponent } from './work-exps/work-exps.component';

const routes: Routes = [
  {
    path: 'signIn',
    component: SignInComponent,
    data: {
      animation: 'signIn',
    },
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'general',
        component: GeneralComponent,
        data: {
          animation: 'general',
        },
      },
      {
        path: 'abouts',
        component: AboutsComponent,
        data: {
          animation: 'abouts',
        },
      },
      {
        path: 'courses',
        component: CoursesComponent,
        data: {
          animation: 'courses',
        },
      },
      {
        path: 'educations',
        component: EducationsComponent,
        data: {
          animation: 'educations',
        },
      },
      {
        path: 'hackathons',
        component: HackathonsComponent,
        data: {
          animation: 'hackathons',
        },
      },
      {
        path: 'pors',
        component: PorsComponent,
        data: {
          animation: 'pors',
        },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          animation: 'projects',
        },
      },
      {
        path: 'specializations',
        component: SpecializationsComponent,
        data: {
          animation: 'specializations',
        },
      },
      {
        path: 'tech-skills',
        component: TechSkillsComponent,
        data: {
          animation: 'tech-skills',
        },
      },
      {
        path: 'volunteer-exps',
        component: VolunteerExpsComponent,
        data: {
          animation: 'volunteer-exps',
        },
      },
      {
        path: 'work-exps',
        component: WorkExpsComponent,
        data: {
          animation: 'work-exps',
        },
      },
      {
        path: '',
        redirectTo: 'general',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
