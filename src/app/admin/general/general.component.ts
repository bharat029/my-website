import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { first, Observable } from 'rxjs';
import { Resume } from 'src/app/store/cv/cv.actions';
import { CvState } from 'src/app/store/cv/cv.state';
import { LandingSubtitle, ProfileImage } from 'src/app/store/root/root.actions';
import { RootState } from 'src/app/store/root/root.state';
import { AddUpdateFormComponent } from '../add-update-form/add-update-form.component';
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
    private store: Store,
    private firestore: FirestoreService,
    private storage: StorageService,
    private dialog: MatDialog
  ) {}

  updateLandingSubtitle() {
    this.landingSubtitle$.pipe(first()).subscribe((landingSubtitle) => {
      const dialogRef = this.dialog.open(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.LANDING_SUBTITLE,
          edit: true,
          data: landingSubtitle,
        },
      });
      dialogRef.afterClosed().subscribe(async (data) => {
        await this.firestore.update(data.value);
        this.store.dispatch(
          new LandingSubtitle.Update(data.value.landingSubtitle)
        );
      });
    });
  }

  updateProfileImage() {
    this.profileImageUrl$.pipe(first()).subscribe((profileImageUrl) => {
      const dialogRef = this.dialog.open(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.PROFILE_IMAGE,
          edit: true,
          data: profileImageUrl,
        },
      });
      dialogRef.afterClosed().subscribe(async (data) => {
        const profileImageUrl = await this.storage.uploadProfileImage(
          data.value.profileImage.files[0]
        );
        await this.firestore.update({ profileImageUrl });
        this.store.dispatch(new ProfileImage.Update(profileImageUrl));
      });
    });
  }

  updateResumeUrl() {
    this.resumeUrl$.pipe(first()).subscribe((resumeUrl) => {
      const dialogRef = this.dialog.open(AddUpdateFormComponent, {
        width: '50%',
        data: {
          type: FormType.RESUME,
          edit: true,
          data: resumeUrl,
        },
      });
      dialogRef.afterClosed().subscribe(async (data) => {
        const resumeUrl = await this.storage.uploadResume(
          data.value.resume.files[0]
        );
        await this.firestore.updateCV({ resumeUrl });
        this.store.dispatch(new Resume.Update(resumeUrl));
      });
    });
  }
}
