import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Course, Specialization } from '../store/root/root.model';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(RootState.getCourses) courses$!: Observable<Course[]>;
  @Select(RootState.getSpecializations) specializations$!: Observable<Specialization[]>;
  isHandset$!: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
  }
}
