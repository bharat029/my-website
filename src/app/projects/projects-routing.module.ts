import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: DetailsComponent,
    data: { animation: 'project-details' },
  },
  {
    path: '',
    component: ProjectsComponent,
    pathMatch: 'full',
    data: { animation: 'projects' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
