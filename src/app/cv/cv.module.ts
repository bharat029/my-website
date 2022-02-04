import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CvComponent],
  imports: [CommonModule, CvRoutingModule, SharedModule],
})
export class CvModule {}
