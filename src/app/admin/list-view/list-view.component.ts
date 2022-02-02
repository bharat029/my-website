import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Definition,
  WorkExperience,
  Hackathon,
  VolunteerExperience,
} from 'src/app/store/cv/cv.model';
import {
  Content,
  Course,
  Project,
  Specialization,
} from 'src/app/store/root/root.model';

@Component({
  selector: 'admin-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent {
  @Input() items!: any[];
  @Input() property!: string;
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() reorder = new EventEmitter();

  constructor() {}

  addItem() {
    this.add.emit();
  }

  dropItem(event: CdkDragDrop<any[]>) {
    const items = [...this.items];

    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.reorder.emit(items);
  }

  deleteItem(id: string) {
    this.delete.emit(id);
  }

  updateItem(item: any) {
    this.update.emit(item);
  }
}
