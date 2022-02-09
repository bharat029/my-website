import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Project } from '../store/root/root.model';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(RootState.getProjects) projects$!: Observable<Project[]>;
  isHandset$!: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
  }
}
