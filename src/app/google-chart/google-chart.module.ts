import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './service/service.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [BarChartComponent],
  imports: [
    CommonModule,
    ServiceModule
  ],
  exports: [BarChartComponent],
  providers : []
})
export class GoogleChartModule { }