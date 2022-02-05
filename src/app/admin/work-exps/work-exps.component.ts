import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetWorkExps } from 'src/app/store/cv/cv.actions';
import { WorkExperience } from 'src/app/store/cv/cv.model';
import { CvState } from 'src/app/store/cv/cv.state';
import { AddUpdateFormComponent, DialogData } from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-work-exps',
  templateUrl: './work-exps.component.html',
  styleUrls: ['./work-exps.component.scss']
})
export class WorkExpsComponent implements OnInit {
  @Select(CvState.getWorkExps) workExps$!: Observable<WorkExperience[]>;
  workExps!: WorkExperience[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.workExps$.subscribe((workExps) => (this.workExps = workExps));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      WorkExperience
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.WORK_EXP,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.workExps, data]);
        this.snackbar.open('Work Experience Added!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  update(workExp: WorkExperience) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      WorkExperience
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.WORK_EXP,
        edit: true,
        data: workExp,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.workExps.map((workExp) => 
            workExp.id !== data.id ? workExp : data
          )
        );
        this.snackbar.open('Work Experience Updated!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.workExps.filter((workExp) => workExp.id !== id),
    ]);
    this.snackbar.open('Work Experience Deleted!', 'Close', { duration: 3000 });
  }

  async set(workExps: WorkExperience[]) {
    try {
      await this.firestore.updateCV({ workExps });
      this.store.dispatch(new SetWorkExps(workExps));
    } catch (error) {}
  }
}
