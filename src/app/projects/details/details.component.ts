import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { combineLatest, first, map, Observable } from 'rxjs';
import { Project } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';

@Component({
  selector: 'projects-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Select(RootState.getIsReady) isReady$!: Observable<boolean>;
  @Select(RootState.getPlaceholderUrl) placeholderUrl$!: Observable<string>;
  @Select(RootState.getProjects) projects$!: Observable<Project[]>;
  project$!: Observable<Project>;
  isHandset$!: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
  }

  ngOnInit(): void {
    this.project$ = this.projects$.pipe(
      map(
        (projects) =>
          projects &&
          projects.find(
            (project) => project.id === this.route.snapshot.params['projectId']
          )!
      )
    );

    combineLatest([
      this.project$,
      this.isReady$,
      this.placeholderUrl$,
    ]).subscribe(([project, isReady, placeholderUrl]) => {
      if (!project && isReady) {
        this.router.navigate(['/not-found']);
      } else if (isReady) {
        this.title.setTitle(project.title + ' | Bharathan Mudaliar');

        this.meta.addTags([
          {
            name: 'description',
            property: 'og:description',
            content: project.descs.join(''),
          },
          {
            name: 'title',
            property: 'og:title',
            content: project.title,
          },
          {
            property: 'og:image',
            content: project.cardImageUrl ?? placeholderUrl,
          },
          {
            property: 'og:url',
            content: `https://bharathanmudaliar.com${this.router.url}`,
          },
        ]);
      }
    });
  }
}
