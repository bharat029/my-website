import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSpecializations } from 'src/app/store/root/root.actions';
import { Specialization } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';
import { StorageService } from '../storage.service';

interface DialogReturnType extends Specialization {
  cardImage: { files: File[] };
}

@Component({
  selector: 'admin-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.scss'],
})
export class SpecializationsComponent implements OnInit {
  @Select(RootState.getSpecializations) specializations$!: Observable<
    Specialization[]
  >;
  specializations!: Specialization[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.specializations$.subscribe(
      (specializations) => (this.specializations = specializations)
    );
  }

  async toSpecialization(data: DialogReturnType): Promise<Specialization> {
    let cardImageUrl: Specialization['cardImageUrl'];

    if (data.cardImage) {
      cardImageUrl = await this.storage.uploadSpecializationCardImage(
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
      courses: data.courses,
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
        type: FormType.SPECIALIZATION,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newSpecialization = await this.toSpecialization(data);
          await this.set([...this.specializations, newSpecialization]);
          this.snackbar.open('Specialization Added!', 'Close', {
            duration: 3000,
          });
        }
      } catch (error) {}
    });
  }

  update(specialization: Specialization) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      DialogReturnType
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.SPECIALIZATION,
        edit: true,
        data: specialization,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newSpecialization = await this.toSpecialization(data);
          await this.set(
            this.specializations.map((specialization) =>
              specialization.id !== data.id ? specialization : newSpecialization
            )
          );
          this.snackbar.open('Specialization Updated!', 'Close', {
            duration: 3000,
          });
        }
      } catch (error) {}
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.specializations.filter(
        (specialization) => specialization.id !== id
      ),
    ]);
    this.snackbar.open('Specialization Delete!', 'Close', { duration: 3000 });
  }

  async set(specializations: Specialization[]) {
    try {
      await this.firestore.update({ specializations });
      this.store.dispatch(new SetSpecializations(specializations));
    } catch (error) {
      console.log(error);
    }
  }
}
