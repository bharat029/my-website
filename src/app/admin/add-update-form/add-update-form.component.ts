import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Definition,
  Hackathon,
  VolunteerExperience,
  WorkExperience,
} from 'src/app/store/cv/cv.model';
import {
  Content,
  Course,
  Project,
  Specialization,
} from 'src/app/store/root/root.model';
import { FormType } from '../form.models';
import { v4 as uuidv4 } from 'uuid';

export interface DialogData {
  edit: boolean;
  type: FormType;
  data?:
    | string
    | Content
    | Definition
    | Project
    | Course
    | Specialization
    | WorkExperience
    | Hackathon
    | VolunteerExperience;
}

@Component({
  selector: 'app-add-update-form',
  templateUrl: './add-update-form.component.html',
  styleUrls: ['./add-update-form.component.scss'],
})
export class AddUpdateFormComponent implements OnInit {
  formModel!: FormGroup;
  FormType = FormType;
  descs!: FormArray;
  highlights!: FormArray;
  courses!: FormArray;
  roles!: FormArray;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    switch (this.data.type) {
      case FormType.LANDING_SUBTITLE:
        this.formModel = this.fb.group({
          landingSubtitle: [this.data.data],
        });
        break;

      case FormType.PROFILE_IMAGE:
        this.formModel = this.fb.group({
          profileImage: [null],
        });
        break;

      case FormType.RESUME:
        this.formModel = this.fb.group({
          resume: [null],
        });
        break;

      case FormType.ABOUT:
        if (this.data.edit) {
          this.formModel = this.fb.group({
            id: [(this.data.data as Content).id],
            content: [(this.data.data as Content).content],
          });
        } else {
          this.formModel = this.fb.group({
            id: [uuidv4()],
            content: [''],
          });
        }
        break;

      case FormType.COURSE:
        if (this.data.edit) {
          this.formModel = this.fb.group({
            id: [(this.data.data as Course).id],
            title: [(this.data.data as Course).title],
            certificate: [(this.data.data as Course).certificate],
            offeredBy: [(this.data.data as Course).offeredBy],
            platform: [(this.data.data as Course).platform],
            cardImage: [null],
          });
        } else {
          this.formModel = this.fb.group({
            id: [uuidv4()],
            title: [''],
            certificate: [''],
            offeredBy: [''],
            platform: [''],
            cardImage: [null],
          });
        }
        break;

      //   case FormType.PROJECT:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as Project).title ],
      //         current: [ (this.data.data as Project).current ],
      //         repoLink: [ (this.data.data as Project).repoLink ],
      //         visitLink: [ (this.data.data as Project).visitLink ],
      //         projectCardImage: [ null ],
      //         descs: this.fb.array([]),
      //         highlights: this.fb.array([]),
      //       });

      //       this.descs = (this.formModel.get('descs') as FormArray);
      //       this.highlights = (this.formModel.get('highlights') as FormArray);

      //       (this.data.data as Project).descs.forEach(desc => this.pushControl(this.descs, desc));
      //       (this.data.data as Project).highlights.forEach(hl => this.pushControl(this.highlights, hl));
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [''],
      //         current: [''],
      //         repoLink: [''],
      //         visitLink: [''],
      //         projectCardImage: [ null ],
      //         descs: this.fb.array([]),
      //         highlights: this.fb.array([]),
      //       });

      //       this.descs = (this.formModel.get('descs') as FormArray);
      //       this.highlights = (this.formModel.get('highlights') as FormArray);

      //       this.pushControl(this.descs, '');
      //       this.pushControl(this.highlights, '');
      //     }
      //     break;

      case FormType.SPECIALIZATION:
        if (this.data.edit) {
          this.formModel = this.fb.group({
            id: [(this.data.data as Specialization).id],
            title: [(this.data.data as Specialization).title],
            certificate: [(this.data.data as Specialization).certificate],
            offeredBy: [(this.data.data as Specialization).offeredBy],
            platform: [(this.data.data as Specialization).platform],
            cardImage: [null],
            courses: this.fb.array([]),
          });

          this.courses = this.formModel.get('courses') as FormArray;

          (this.data.data as Specialization).courses.forEach((course) =>
            this.pushCourseGroup(this.courses, course.title, course.certificate)
          );
        } else {
          this.formModel = this.fb.group({
            id: [uuidv4()],
            title: [''],
            certificate: [''],
            offeredBy: [''],
            platform: [''],
            cardImage: [null],
            courses: this.fb.array([]),
          });

          this.courses = this.formModel.get('courses') as FormArray;
          this.pushCourseGroup(this.courses, '', '');
        }
        break;

      //   case FormType.EDUCATION:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         content: [ (this.data.data as Content).content ],
      //       });
      //     } else {
      //       this.formModel = this.fb.group({
      //         content: [ '' ],
      //       });
      //     }
      //     break;

      //   case FormType.TSKILL:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as DefinitiionElement).title ],
      //         desc: [ (this.data.data as DefinitiionElement).desc ],
      //       });
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [ '' ],
      //         desc: [ '' ],
      //       });
      //     }
      //     break;

      //   case FormType.POR:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as DefinitiionElement).title ],
      //         desc: [ (this.data.data as DefinitiionElement).desc ],
      //       });
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [ '' ],
      //         desc: [ '' ],
      //       });
      //     }
      //     break;

      //   case FormType.WORK_EXPERIENCE:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as WorkExperience).title ],
      //         desc: [ (this.data.data as WorkExperience).desc ],
      //         duration: [ (this.data.data as WorkExperience).duration ],
      //         role: [ (this.data.data as WorkExperience).role ],
      //       });
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [ '' ],
      //         desc: [ '' ],
      //         duration: [ '' ],
      //         role: [ '' ],
      //       });
      //     }
      //     break;

      //   case FormType.HACKATHON:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as Hackathon).title ],
      //         desc: [ (this.data.data as Hackathon).desc ],
      //         event: [ (this.data.data as Hackathon).event ],
      //       });
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [ '' ],
      //         desc: [ '' ],
      //         event: [ '' ],
      //       });
      //     }
      //     break;

      //   case FormType.VOLUNTEER_EXPERIENCE:
      //     if (this.data.edit) {
      //       this.formModel = this.fb.group({
      //         title: [ (this.data.data as VolunteerExperience).title ],
      //         desc: [ (this.data.data as VolunteerExperience).desc ],
      //         roles: this.fb.array([]),
      //       });

      //       this.roles = (this.formModel.get('roles') as FormArray);

      //       (this.data.data as VolunteerExperience).roles.forEach(role => this.pushControl(this.roles, role));
      //     } else {
      //       this.formModel = this.fb.group({
      //         title: [''],
      //         desc: [''],
      //         roles: this.fb.array([]),
      //       });

      //       this.roles = (this.formModel.get('roles') as FormArray);
      //       this.pushControl(this.roles, '');
      //     }
      //     break;

      default:
        break;
    }
  }

  pushControl(to: FormArray, value: string) {
    to.push(this.fb.control(value));
  }

  popControl(to: FormArray, idx: number) {
    to.removeAt(idx);
  }

  pushCourseGroup(to: FormArray, title: string, certificate: string) {
    to.push(
      this.fb.group({
        title: [title],
        certificate: [certificate],
      })
    );
  }
}
