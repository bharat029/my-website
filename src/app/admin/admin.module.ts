import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutsComponent } from './abouts/abouts.component';
import { AdminRoutingModule } from './admin-routing.module';
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

@NgModule({
  declarations: [
    AdminComponent,
    CoursesComponent,
    ProjectsComponent,
    SpecializationsComponent,
    EducationsComponent,
    WorkExpsComponent,
    VolunteerExpsComponent,
    TechSkillsComponent,
    HackathonsComponent,
    PorsComponent,
    SignInComponent,
    AboutsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
