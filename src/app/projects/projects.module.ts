import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [ProjectsComponent, DetailsComponent],
  imports: [CommonModule, MatTooltipModule, ProjectsRoutingModule, SharedModule],
})
export class ProjectsModule {}
