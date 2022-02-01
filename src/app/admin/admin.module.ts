import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
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
import { GeneralComponent } from './general/general.component';
import { AddUpdateFormComponent } from './add-update-form/add-update-form.component';
import { ListViewComponent } from './list-view/list-view.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';

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
    GeneralComponent,
    AddUpdateFormComponent,
    ListViewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
