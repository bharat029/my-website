import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


const materialModules = [
  LayoutModule,
  FlexLayoutModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materialModules],
  exports: [materialModules],
})
export class SharedModule {}
