import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Project } from '../store/root/root.model';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Select(RootState.getProjects) projects$!: Observable<Project[]>;
}
