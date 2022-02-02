import { Component, OnInit } from '@angular/core';
import { Observable } from '@firebase/util';
import { Select } from '@ngxs/store';
import { Content } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';

@Component({
  selector: 'admin-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  @Select(RootState.getAbouts) abouts$!: Observable<Content[]>;
  abouts!: Content[];

  constructor() {}

  ngOnInit(): void {
    this.abouts$.subscribe((abouts) => (this.abouts = abouts));
  }

  add() {}

  update(about: Content) {}

  delete(id: string) {}

  reorder(abouts: Content[]) {}
}
