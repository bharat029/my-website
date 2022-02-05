import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetPORs } from 'src/app/store/cv/cv.actions';
import { Definition } from 'src/app/store/cv/cv.model';
import { CvState } from 'src/app/store/cv/cv.state';
import { AddUpdateFormComponent, DialogData } from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-pors',
  templateUrl: './pors.component.html',
  styleUrls: ['./pors.component.scss'],
})
export class PorsComponent implements OnInit {
  @Select(CvState.getPORs) pors$!: Observable<Definition[]>;
  pors!: Definition[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.pors$.subscribe((pors) => (this.pors = pors));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Definition
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.POR,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.pors, data]);
        this.snackbar.open('POR Added!', 'Close', { duration: 3000 });
      }
    });
  }

  update(por: Definition) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Definition
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.POR,
        edit: true,
        data: por,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.pors.map((por) => (por.id !== data.id ? por : data))
        );
        this.snackbar.open('POR Updated!', 'Close', { duration: 3000 });
      }
    });
  }

  async delete(id: string) {
    await this.set([...this.pors.filter((por) => por.id !== id)]);
    this.snackbar.open('POR Deleted!', 'Close', { duration: 3000 });
  }

  async set(pors: Definition[]) {
    try {
      await this.firestore.updateCV({ pors });
      this.store.dispatch(new SetPORs(pors));
    } catch (error) {}
  }
}
