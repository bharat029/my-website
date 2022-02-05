import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  SetProjects,
  SetSpecializations,
} from 'src/app/store/root/root.actions';
import { Project, Specialization } from 'src/app/store/root/root.model';
import { RootState } from 'src/app/store/root/root.state';
import {
  AddUpdateFormComponent,
  DialogData,
} from '../add-update-form/add-update-form.component';
import { FirestoreService } from '../firestore.service';
import { FormType } from '../form.models';
import { StorageService } from '../storage.service';

interface DialogReturnType extends Project {
  cardImage: { files: File[] };
}

@Component({
  selector: 'admin-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  @Select(RootState.getProjects) projects$!: Observable<Project[]>;
  projects!: Project[];

  constructor(
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private snackbar: MatSnackBar,
    private store: Store,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.projects$.subscribe((projects) => (this.projects = projects));
  }

  async toProject(data: DialogReturnType): Promise<Project> {
    let cardImageUrl: Project['cardImageUrl'];

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
      descs: data.descs,
      current: data.current,
      highlights: data.highlights,
      repoLink: data.repoLink,
      visitLink: data.visitLink,
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
        type: FormType.PROJECT,
        edit: false,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newProject = await this.toProject(data);
          await this.set([...this.projects, newProject]);
          this.snackbar.open('Project Added!', 'Close', { duration: 3000 });
        }
      } catch (error) {}
    });
  }

  update(project: Project) {
    const dialogRef = this.dialog.open<
      AddUpdateFormComponent,
      DialogData,
      DialogReturnType
    >(AddUpdateFormComponent, {
      width: '50%',
      data: {
        type: FormType.PROJECT,
        edit: true,
        data: project,
      },
    });

    dialogRef.afterClosed().subscribe(async (data) => {
      try {
        if (data) {
          const newProject = await this.toProject(data);
          await this.set(
            this.projects.map((project) =>
              project.id !== data.id ? project : newProject
            )
          );
          this.snackbar.open('Project Updated!', 'Close', { duration: 3000 });
        }
      } catch (error) {}
    });
  }

  async delete(id: string) {
    await this.set([...this.projects.filter((project) => project.id !== id)]);
    this.snackbar.open('Project Deleted!', 'Close', { duration: 3000 });
  }

  async set(projects: Project[]) {
    try {
      await this.firestore.update({ projects });
      this.store.dispatch(new SetProjects(projects));
    } catch (error) {}
  }
}
