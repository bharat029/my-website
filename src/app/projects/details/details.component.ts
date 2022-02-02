import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { first, map, Observable, tap } from 'rxjs';
import { Project } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';

@Component({
  selector: 'projects-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Select(RootState.getProjects) projects$!: Observable<Project[]>;
  project$!: Observable<Project>;

  constructor(
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.project$ = this.projects$.pipe(
      map(
        (projects) =>
          projects.find(
            (project) => project.id === this.route.snapshot.params['projectId']
          )!
      )
    );

    this.project$.pipe(first()).subscribe((project) => {
      if (!project) {
        this.router.navigate(['/projects']);
      } else {
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
            content:
              project.cardImageUrl ??
              'https://firebasestorage.googleapis.com/v0/b/my-website-dev-2aa35.appspot.com/o/images%2Fplaceholder.jpg?alt=media&token=3f7d6185-f467-4b86-bd1f-2db8fa9068b1',
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
