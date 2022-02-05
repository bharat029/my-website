import {
  trigger,
  style,
  query,
  animate,
  transition,
  group,
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

const triggerArray = (
  duration: string = '750ms',
  timingFunction: string = 'ease-in-out'
) => [
  transition('* => general', fromLeft(duration, timingFunction)),
  transition('general => abouts', fromRight(duration, timingFunction)),
  transition('* => abouts', fromLeft(duration, timingFunction)),
  transition('general => courses', fromRight(duration, timingFunction)),
  transition('abouts => courses', fromRight(duration, timingFunction)),
  transition('* => courses', fromLeft(duration, timingFunction)),
  transition('general => educations', fromRight(duration, timingFunction)),
  transition('abouts => educations', fromRight(duration, timingFunction)),
  transition('courses => educations', fromRight(duration, timingFunction)),
  transition('* => educations', fromLeft(duration, timingFunction)),
  transition('general => hackathons', fromRight(duration, timingFunction)),
  transition('abouts => hackathons', fromRight(duration, timingFunction)),
  transition('courses => hackathons', fromRight(duration, timingFunction)),
  transition('educations => hackathons', fromRight(duration, timingFunction)),
  transition('* => hackathons', fromLeft(duration, timingFunction)),
  transition('work-exps => pors', fromLeft(duration, timingFunction)),
  transition('volunteer-exps => pors', fromLeft(duration, timingFunction)),
  transition('tech-skills => pors', fromLeft(duration, timingFunction)),
  transition('specializations => pors', fromLeft(duration, timingFunction)),
  transition('projects => pors', fromLeft(duration, timingFunction)),
  transition('* => pors', fromRight(duration, timingFunction)),
  transition('work-exps => projects', fromLeft(duration, timingFunction)),
  transition('volunteer-exps => projects', fromLeft(duration, timingFunction)),
  transition('tech-skills => projects', fromLeft(duration, timingFunction)),
  transition('specializations => projects', fromLeft(duration, timingFunction)),
  transition('* => projects', fromRight(duration, timingFunction)),
  transition('work-exps => specializations', fromLeft(duration, timingFunction)),
  transition('volunteer-exps => specializations', fromLeft(duration, timingFunction)),
  transition('tech-skills => specializations', fromLeft(duration, timingFunction)),
  transition('* => specializations', fromRight(duration, timingFunction)),
  transition('work-exps => tech-skills', fromLeft(duration, timingFunction)),
  transition('volunteer-exps => tech-skills', fromLeft(duration, timingFunction)),
  transition('* => tech-skills', fromRight(duration, timingFunction)),
  transition('work-exps => volunteer-exps', fromLeft(duration, timingFunction)),
  transition('* => volunteer-exps', fromRight(duration, timingFunction)),
  transition('* => work-exps', fromRight(duration, timingFunction)),
]

export const adminRouteAnimations = trigger('adminRouteAnimations', triggerArray('750ms', 'ease'));
