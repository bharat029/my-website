import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from '@firebase/util';
import { Select, Store } from '@ngxs/store';
import { SetAbouts } from 'src/app/store/root/root.actions';
import { Content } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-abouts',
  templateUrl: './abouts.component.html',
  styleUrls: ['./abouts.component.scss'],
})
export class AboutsComponent implements OnInit {
  @Select(RootState.getAbouts) abouts$!: Observable<Content[]>;
  abouts!: Content[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.abouts$.subscribe((abouts) => (this.abouts = abouts));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Content
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.ABOUT,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.abouts, data]);
        this.snackbar.open('About Added!', 'Close', { duration: 3000 });
      }
    });
  }

  update(about: Content) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Content
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.ABOUT,
        edit: true,
        data: about,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.abouts.map((about) => (about.id !== data.id ? about : data))
        );
        this.snackbar.open('About Updated!', 'Close', { duration: 3000 });
      }
    });
  }

  async delete(id: string) {
    await this.set([...this.abouts.filter((about) => about.id !== id)]);
    this.snackbar.open('About Deleted!', 'Close', { duration: 3000 });
  }

  async set(abouts: Content[]) {
    try {
      await this.firestore.update({ abouts });
      this.store.dispatch(new SetAbouts(abouts));
    } catch (error) {}
  }
}
