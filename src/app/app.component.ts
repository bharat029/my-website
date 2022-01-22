import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Init } from './store/root/root.actions';
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
    setInterval(() => this.store.dispatch(new Init()), 1000);
  }
}
