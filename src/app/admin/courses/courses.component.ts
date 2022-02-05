import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetCourses } from 'src/app/store/root/root.actions';
import { Course } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';
import { StorageService } from '../storage.service';

interface DialogReturnType extends Course {
  cardImage: { files: File[] };
}

@Component({
  selector: 'admin-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  @Select(RootState.getCourses) courses$!: Observable<Course[]>;
  courses!: Course[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private store: Store,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.courses$.subscribe((courses) => (this.courses = courses));
  }

  async toCourse(data: DialogReturnType): Promise<Course> {
    if (data.cardImage) {
      const cardImageUrl = await this.storage.uploadCourseCardImage(
        data.cardImage.files[0],
        data.title
      );

      return {
        id: data.id,
        title: data.title,
        certificate: data.certificate,
        offeredBy: data.offeredBy,
        platform: data.platform,
        cardImageUrl,
      };
    } else {
      return data.cardImageUrl
        ? {
            id: data.id,
            title: data.title,
            certificate: data.certificate,
            offeredBy: data.offeredBy,
            platform: data.platform,
            cardImageUrl: data.cardImageUrl,
          }
        : {
            id: data.id,
            title: data.title,
            certificate: data.certificate,
            offeredBy: data.offeredBy,
            platform: data.platform,
          };
    }
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      DialogReturnType
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.COURSE,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newCourse = await this.toCourse(data);
          this.set([...this.courses, newCourse]);
        }
      } catch (error) {}
    });
  }

  update(course: Course) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      DialogReturnType
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.COURSE,
        edit: true,
        data: course,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newCourse = await this.toCourse(data);
          this.set(
            this.courses.map((course) =>
              course.id !== data.id ? course : newCourse
            )
          );
        }
      } catch (error) {}
    });
  }

  delete(id: string) {
    this.set([...this.courses.filter((course) => course.id !== id)]);
  }

  async set(courses: Course[]) {
    try {
      await this.firestore.update({ courses });
      this.store.dispatch(new SetCourses(courses));
    } catch (error) {}
  }
}
