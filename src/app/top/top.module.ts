import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [TopComponent, DetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FullCalendarModule,
    MatTooltipModule,
  ],
  providers: [DatePipe],
})
export class TopModule {}
