import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetEducations } from 'src/app/store/cv/cv.actions';
import { CvState } from 'src/app/store/cv/cv.state';
import { Content } from 'src/app/store/root/root.model';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.scss'],
})
export class EducationsComponent implements OnInit {
  @Select(CvState.getEducations) educations$!: Observable<Content[]>;
  educations!: Content[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.educations$.subscribe((educations) => (this.educations = educations));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Content
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.EDUCATION,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.educations, data]);
        this.snackbar.open('Education Added!', 'Close', { duration: 3000 });
      }
    });
  }

  update(education: Content) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Content
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.EDUCATION,
        edit: true,
        data: education,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.educations.map((education) =>
            education.id !== data.id ? education : data
          )
        );
        this.snackbar.open('Education Updated!', 'Close', { duration: 3000 });
      }
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.educations.filter((education) => education.id !== id),
    ]);
    this.snackbar.open('Education Deleted!', 'Close', { duration: 3000 });
  }

  async set(educations: Content[]) {
    try {
      await this.firestore.updateCV({ educations });
      this.store.dispatch(new SetEducations(educations));
    } catch (error) {}
  }
}
