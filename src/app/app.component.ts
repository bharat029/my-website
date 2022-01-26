import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component, OnInit
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, mergeMap, Observable } from 'rxjs';
import { routeAnimations } from './route-animations';
import { Init } from './store/root/root.actions';
import { RootState } from './store/root/root.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(RootState.getSubtitleAndProfile) subtitleAndProfile$!: Observable<{
    landingSubtitle: string;
    profileImageUrl: string;
  }>;
  isHandset$!: Observable<boolean>;

  constructor(
    private store: Store,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
  }

  ngOnInit(): void {
    this.store.dispatch(new Init());
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.titleService.setTitle(data['title']);

        this.subtitleAndProfile$.subscribe((subtitleAndProfile) => {
          this.metaService.addTags([
            {
              name: 'description',
              property: 'og:description',
              content:
                data['description'] ?? subtitleAndProfile.landingSubtitle,
            },
            {
              name: 'title',
              property: 'og:title',
              content: data['title'],
            },
            {
              property: 'og:image',
              content: subtitleAndProfile.profileImageUrl,
            },
            {
              property: 'og:url',
              content: `https://bharathanmudaliar.com${this.router.url}`,
            },
          ]);
        });
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
