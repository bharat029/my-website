import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Init } from './store/root/root.actions';
import { RootStateModel } from './store/root/root.model';
import { RootState } from './store/root/root.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-website';

  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(new Init());
  }
}
