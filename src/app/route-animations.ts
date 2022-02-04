import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
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

const fromBottom = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateY(1000%)',
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
      [animate('500ms ease-in', style({ transform: 'translateY(-1000%)' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('500ms ease-in-out', style({ transform: 'translateY(0)' }))],
      { optional: true }
    ),
  ]),
];

const fromTop = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateY(-1000%)',
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
      [animate('500ms ease-in', style({ transform: 'translateY(1000%)' }))],
      { optional: true }
    ),
    query(
      ':enter',
      [animate('500ms ease-in-out', style({ transform: 'translateY(0)' }))],
      { optional: true }
    ),
  ]),
];

const zoomIn = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transformOrigin: '50vw 50vh',
        transform: 'scale(0.25)',
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
        opacity: 1,
        transformOrigin: '50vw 50vh',
        transform: 'scale(1)',
      }),
    ],
    { optional: true }
  ),
  group([
    query(
      ':leave',
      [
        animate(
          '750ms ease-in-out',
          style({ opacity: 0, transform: 'scale(10)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const zoomOut = () => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transformOrigin: '50vw 50vh',
        transform: 'scale(10)',
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
        opacity: 1,
        transformOrigin: '50vw 50vh',
        transform: 'scale(1)',
      }),
    ],
    { optional: true }
  ),
  group([
    query(
      ':leave',
      [
        animate(
          '750ms ease-in-out',
          style({ opacity: 0, transform: 'scale(0)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

export const routeAnimations = trigger('routeAnimations', [
  transition('* => admin', zoomIn()),
  transition('admin => *', zoomOut()),
  transition('* => landing', zoomOut()),
  transition('landing => *', zoomIn()),
  transition('* => about', fromLeft()),
  transition('about => projects', fromRight()),
  transition('project-details => projects', fromTop()),
  transition('* => projects', fromLeft()),
  transition('projects => project-details', fromBottom()),
  transition('about => project-details', fromRight()),
  transition('* => project-details', fromLeft()),
  transition('cv => courses', fromLeft()),
  transition('* => courses', fromRight()),
  transition('* => cv', fromRight()),
]);
