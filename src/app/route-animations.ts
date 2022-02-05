import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const fromRight = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
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
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateX(-100%)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateX(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const fromLeft = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
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
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateX(100%)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateX(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const fromBottom = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
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
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateY(-1000%)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const fromTop = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
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
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateY(1000%)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ transform: 'translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const zoomIn = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
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
        height: '100%',
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
          `${duration} ${timingFunction}`,
          style({ opacity: 0, transform: 'scale(10)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const zoomOut = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
  query(
    ':enter',
    [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
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
          `${duration} ${timingFunction}`,
          style({ opacity: 0, transform: 'scale(0)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          `${duration} ${timingFunction}`,
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ],
      { optional: true }
    ),
  ]),
];

const triggerArray = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
  transition('* => admin', zoomIn(duration, timingFunction)),
  transition('admin => *', zoomOut(duration, timingFunction)),
  transition('* => landing', zoomOut(duration, timingFunction)),
  transition('landing => *', zoomIn(duration, timingFunction)),
  transition('project-details => *', zoomOut(duration, timingFunction)),
  transition('* => project-details', zoomIn(duration, timingFunction)),
  transition('* => about', fromLeft(duration, timingFunction)),
  transition('about => projects', fromRight(duration, timingFunction)),
  transition('* => projects', fromLeft(duration, timingFunction)),
  transition('cv => courses', fromLeft(duration, timingFunction)),
  transition('* => courses', fromRight(duration, timingFunction)),
  transition('* => cv', fromRight(duration, timingFunction)),
]

export const routeAnimations = trigger('routeAnimations', triggerArray('750ms', 'ease'));
