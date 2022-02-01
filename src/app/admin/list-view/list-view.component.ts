import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormType } from '../form.models';

@Component({
  selector: 'admin-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @Input() itemsList!: any[];
  @Input() elementProperty!: string;
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() drop = new EventEmitter();

  constructor(private dialog: MatDialog, private store: Store) { }

  dropItem(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.itemsList, event.previousIndex, event.currentIndex);
    this.drop.emit(this.itemsList);
  }

  delItem(id: string) {
    this.delete.emit(id);
  }

  updateItem(item: any) {
    this.update.emit(item);
  }
}
