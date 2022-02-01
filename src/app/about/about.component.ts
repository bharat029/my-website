import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Content, Project } from '../store/root/root.model';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  @Select(RootState.getProfileImageUrl) profileImageUrl$!: Observable<string>;
  @Select(RootState.getAbouts) abouts$!: Observable<Content[]>;
  @Select(RootState.getCurrentProjects) currentProjects$!: Observable<Project[]>;

  constructor() {}
}
