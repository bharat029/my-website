import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RootState } from '../store/root/root.state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @Select(RootState.getLandingSubtitle) landingSubtitle$!: Observable<string>;

  constructor() {}

  ngOnInit(): void {}
}
