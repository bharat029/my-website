import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export interface RouteData {
  animation: string;
  title: string;
  description?: string;
}

interface CustomRoute extends Route {
  data?: RouteData;
}

const routes: CustomRoute[] = [
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
    data: {
      animation: 'about',
      title: 'About | Bharathan Mudaliar',
    },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    data: {
      animation: 'admin',
      title: 'Admin View | Bharathan Mudaliar',
    },
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    data: {
      animation: 'courses',
      title: 'Courses | Bharathan Mudaliar',
      description:
        'I have taken quite a few courses, completed a handful of specializations and earned a couple professional certificates from online learning platforms like Coursera, Edx and Udemy. Here I list a few of them.',
    },
  },
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
    data: {
      animation: 'cv',
      title: 'CV | Bharathan Mudaliar',
      description:
        'I have added a short description of my skill-set and work experience here.',
    },
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then((m) => m.ProjectsModule),
    data: {
      animation: 'projects',
      title: 'Projects | Bharathan Mudaliar',
      description: 'Here is a short list of projects I have worked on.',
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingModule),
    data: {
      animation: 'landing',
      title: 'Bharathan Mudaliar',
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
