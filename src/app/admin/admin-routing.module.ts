import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutsComponent } from './abouts/abouts.component';
import { AdminComponent } from './admin.component';
import { CoursesComponent } from './courses/courses.component';
import { EducationsComponent } from './educations/educations.component';
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
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'abouts',
        component: AboutsComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'educations',
        component: EducationsComponent,
      },
      {
        path: 'hackathons',
        component: HackathonsComponent,
      },
      {
        path: 'pors',
        component: PorsComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'specializations',
        component: SpecializationsComponent,
      },
      {
        path: 'tech-skills',
        component: TechSkillsComponent,
      },
      {
        path: 'volunteer-exps',
        component: VolunteerExpsComponent,
      },
      {
        path: 'work-exps',
        component: WorkExpsComponent,
      },
      {
        path: '',
        component: SignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
