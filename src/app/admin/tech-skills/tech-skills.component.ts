import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetTechSkills } from 'src/app/store/cv/cv.actions';
import { Definition } from 'src/app/store/cv/cv.model';
import { CvState } from 'src/app/store/cv/cv.state';
import {
  AddUpdateFormComponent,
  DialogData
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-tech-skills',
  templateUrl: './tech-skills.component.html',
  styleUrls: ['./tech-skills.component.scss'],
})
export class TechSkillsComponent implements OnInit {
  @Select(CvState.getTechSkills) techSkills$!: Observable<Definition[]>;
  techSkills!: Definition[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.techSkills$.subscribe((techSkills) => (this.techSkills = techSkills));
  }

  add() {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Definition
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.TECH_SKILL,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set([...this.techSkills, data]);
        this.snackbar.open('Technical Skill Added!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  update(techSkill: Definition) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      Definition
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.TECH_SKILL,
        edit: true,
        data: techSkill,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.set(
          this.techSkills.map((techSkill) =>
            techSkill.id !== data.id ? techSkill : data
          )
        );
        this.snackbar.open('Technical Skill Updated!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  async delete(id: string) {
    await this.set([
      ...this.techSkills.filter((techSkill) => techSkill.id !== id),
    ]);
    this.snackbar.open('Technical Skill Deleted!', 'Close', { duration: 3000 });
  }

  async set(techSkills: Definition[]) {
    try {
      await this.firestore.updateCV({ techSkills });
      this.store.dispatch(new SetTechSkills(techSkills));
    } catch (error) {}
  }
}
