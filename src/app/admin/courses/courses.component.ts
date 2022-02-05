import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackbar: MatSnackBar,
    private store: Store,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.courses$.subscribe((courses) => (this.courses = courses));
  }

  async toCourse(data: DialogReturnType): Promise<Course> {
    let cardImageUrl: Course['cardImageUrl'];

    if (data.cardImage) {
      cardImageUrl = await this.storage.uploadCourseCardImage(
        data.cardImage.files[0],
        data.title
      );
    } else {
      cardImageUrl = data.cardImageUrl;
    }

    return {
      id: data.id,
      title: data.title,
      certificate: data.certificate,
      offeredBy: data.offeredBy,
      platform: data.platform,
      cardImageUrl,
    };
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
          await this.set([...this.courses, newCourse]);
          this.snackbar.open('Course Added!', 'Close', { duration: 3000 });
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
          await this.set(
            this.courses.map((course) =>
              course.id !== data.id ? course : newCourse
            )
          );
          this.snackbar.open('Course Updated!', 'Close', { duration: 3000 });
        }
      } catch (error) {}
    });
  }

  delete(id: string) {
    this.set([...this.courses.filter((course) => course.id !== id)]);
    this.snackbar.open('Course Deleted!', 'Close', { duration: 3000 });
  }

  async set(courses: Course[]) {
    try {
      await this.firestore.update({ courses });
      this.store.dispatch(new SetCourses(courses));
    } catch (error) {}
  }
}
