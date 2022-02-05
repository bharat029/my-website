import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetHackathons } from 'src/app/store/cv/cv.actions';
import { Hackathon } from 'src/app/store/cv/cv.model';
import { CvState } from 'src/app/store/cv/cv.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-hackathons',
  templateUrl: './hackathons.component.html',
  styleUrls: ['./hackathons.component.scss'],
})
export class HackathonsComponent implements OnInit {
  @Select(CvState.getHackathons) hackathons$!: Observable<Hackathon[]>;
  hackathons!: Hackathon[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.hackathons$.subscribe((hackathons) => (this.hackathons = hackathons));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Hackathon
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.HACKATHON,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.hackathons, data]);
        this.snackbar.open('Hackathon Added!', 'Close', { duration: 3000 });
      }
    });
  }

  update(hackathon: Hackathon) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Hackathon
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.HACKATHON,
        edit: true,
        data: hackathon,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.hackathons.map((hackathon) =>
            hackathon.id !== data.id ? hackathon : data
          )
        );
        this.snackbar.open('Hackathon Updated!', 'Close', { duration: 3000 });
      }
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.hackathons.filter((hackathon) => hackathon.id !== id),
    ]);
    this.snackbar.open('Hackathon Deleted!', 'Close', { duration: 3000 });
  }

  async set(hackathons: Hackathon[]) {
    try {
      await this.firestore.updateCV({ hackathons });
      this.store.dispatch(new SetHackathons(hackathons));
    } catch (error) {}
  }
}
