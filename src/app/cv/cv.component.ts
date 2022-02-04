import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CVStateModel } from '../store/cv/cv.model';
import { CvState } from '../store/cv/cv.state';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent {
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(CvState.getCV) cv$!: Observable<CVStateModel>;
}
