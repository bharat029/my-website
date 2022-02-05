import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { SetResumeUrl } from 'src/app/store/cv/cv.actions';
import { CvState } from 'src/app/store/cv/cv.state';
import {
  SetLandingSubtitle,
  SetProfileImage,
} from 'src/app/store/root/root.actions';
import { RootState } from 'src/app/store/root/root.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';
import { StorageService } from '../storage.service';

@Component({
  selector: 'admin-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent {
  @Select(RootState.getLandingSubtitle) landingSubtitle$!: Observable<string>;
  @Select(RootState.getProfileImageUrl) profileImageUrl$!: Observable<string>;
  @Select(CvState.getResumeUrl) resumeUrl$!: Observable<string>;

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private storage: StorageService,
    private store: Store
  ) {}

  setLandingSubtitle() {
    this.landingSubtitle$.pipe(first()).subscribe((landingSubtitle) => {
      const dialogRef = this.dialog.open<
        AddUpdateFormComponent,
        DialogData,
        { landingSubtitle: string }
      >(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.LANDING_SUBTITLE,
          edit: true,
          data: landingSubtitle,
        },
      });

      dialogRef.afterClosed().subscribe(async (data) => {
        try {
          if (data) {
            await this.firestore.update(data);
            this.store.dispatch(new SetLandingSubtitle(data.landingSubtitle));
            this.snackbar.open('Landing Subtitle Updated!', 'Close', { duration: 3000 });
          }
        } catch {}
      });
    });
  }

  setProfileImage() {
    this.profileImageUrl$.pipe(first()).subscribe((profileImageUrl) => {
      const dialogRef = this.dialog.open<
        AddUpdateFormComponent,
        DialogData,
        { profileImage: { files: File[] } }
      >(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.PROFILE_IMAGE,
          edit: true,
          data: profileImageUrl,
        },
      });

      dialogRef.afterClosed().subscribe(async (data) => {
        try {
          if (data && data.profileImage) {
            const profileImageUrl = await this.storage.uploadProfileImage(
              data.profileImage.files[0]
            );
            await this.firestore.update({ profileImageUrl });
            this.store.dispatch(new SetProfileImage(profileImageUrl));
            this.snackbar.open('Profile Image Updated!', 'Close', { duration: 3000 });
          }
        } catch {}
      });
    });
  }

  setResumeUrl() {
    this.resumeUrl$.pipe(first()).subscribe((resumeUrl) => {
      const dialogRef = this.dialog.open<
        AddUpdateFormComponent,
        DialogData,
        { resume: { files: File[] } }
      >(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.RESUME,
          edit: true,
          data: resumeUrl,
        },
      });

      dialogRef.afterClosed().subscribe(async (data) => {
        try {
          if (data && data.resume) {
            const resumeUrl = await this.storage.uploadResume(
              data.resume.files[0]
            );
            await this.firestore.updateCV({ resumeUrl });
            this.store.dispatch(new SetResumeUrl(resumeUrl));
            this.snackbar.open('Resume Updated!', 'Close', { duration: 3000 });
          }
        } catch (error) {}
      });
    });
  }
}
