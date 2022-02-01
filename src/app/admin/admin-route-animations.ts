import {
  trigger,
  style,
  query,
  animate,
  transition,
  group,
} from '@angular/animations';

const fromRight = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateX(100%)',
      }),
    ],
    { optional: true }
  ),
  query(
    ':leave',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
      }),
    ],
    { optional: true }
  ),
  group([
    query(
      ':leave',
      [animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))],
      { optional: true }
    ),
  ]),
];

const fromLeft = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateX(-100%)',
      }),
    ],
    { optional: true }
  ),
  query(
    ':leave',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
      }),
    ],
    { optional: true }
  ),
  group([
    query(
      ':leave',
      [animate('500ms ease-in-out', style({ transform: 'translateX(100%)' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))],
      { optional: true }
    ),
  ]),
];

export const adminRouteAnimations = trigger('adminRouteAnimations', [
  transition('* => general', fromLeft()),
  transition('general => abouts', fromRight()),
  transition('* => abouts', fromLeft()),
  transition('general => courses', fromRight()),
  transition('abouts => courses', fromRight()),
  transition('* => courses', fromLeft()),
  transition('general => educations', fromRight()),
  transition('abouts => educations', fromRight()),
  transition('courses => educations', fromRight()),
  transition('* => educations', fromLeft()),
  transition('general => hackathons', fromRight()),
  transition('abouts => hackathons', fromRight()),
  transition('courses => hackathons', fromRight()),
  transition('educations => hackathons', fromRight()),
  transition('* => hackathons', fromLeft()),
  transition('work-exps => pors', fromLeft()),
  transition('volunteer-exps => pors', fromLeft()),
  transition('tech-skills => pors', fromLeft()),
  transition('specializations => pors', fromLeft()),
  transition('projects => pors', fromLeft()),
  transition('* => pors', fromRight()),
  transition('work-exps => projects', fromLeft()),
  transition('volunteer-exps => projects', fromLeft()),
  transition('tech-skills => projects', fromLeft()),
  transition('specializations => projects', fromLeft()),
  transition('* => projects', fromRight()),
  transition('work-exps => specializations', fromLeft()),
  transition('volunteer-exps => specializations', fromLeft()),
  transition('tech-skills => specializations', fromLeft()),
  transition('* => specializations', fromRight()),
  transition('work-exps => tech-skills', fromLeft()),
  transition('volunteer-exps => tech-skills', fromLeft()),
  transition('* => tech-skills', fromRight()),
  transition('work-exps => volunteer-exps', fromLeft()),
  transition('* => volunteer-exps', fromRight()),
  transition('* => work-exps', fromRight()),
]);
