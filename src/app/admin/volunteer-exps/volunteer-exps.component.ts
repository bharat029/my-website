import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetVolunteerExps } from 'src/app/store/cv/cv.actions';
import { VolunteerExperience } from 'src/app/store/cv/cv.model';
import { CvState } from 'src/app/store/cv/cv.state';
import { AddUpdateFormComponent, DialogData } from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-volunteer-exps',
  templateUrl: './volunteer-exps.component.html',
  styleUrls: ['./volunteer-exps.component.scss']
})
export class VolunteerExpsComponent implements OnInit {
  @Select(CvState.getVolunteerExps) volunteerExps$!: Observable<VolunteerExperience[]>;
  volunteerExps!: VolunteerExperience[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.volunteerExps$.subscribe((volunteerExps) => (this.volunteerExps = volunteerExps));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      VolunteerExperience
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.VOLUNTEER_EXP,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.volunteerExps, data]);
        this.snackbar.open('Volunteer Experience Added!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  update(volunteerExp: VolunteerExperience) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      VolunteerExperience
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.VOLUNTEER_EXP,
        edit: true,
        data: volunteerExp,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.volunteerExps.map((volunteerExps) => 
            volunteerExp.id !== data.id ? volunteerExp : data
          )
        );
        this.snackbar.open('Volunteer Experience Updated!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.volunteerExps.filter((volunteerExp) => volunteerExp.id !== id),
    ]);
    this.snackbar.open('Volunteer Experience Deleted!', 'Close', { duration: 3000 });
  }

  async set(volunteerExps: VolunteerExperience[]) {
    try {
      await this.firestore.updateCV({ volunteerExps });
      this.store.dispatch(new SetVolunteerExps(volunteerExps));
    } catch (error) {}
  }
}
