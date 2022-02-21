import { Component, OnInit, Input, HostListener } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit 
{
  @Input() data: any;

  x: any = (Math.random()).toString();
  private g_arr: any[] = new Array();
  private gLib: any;

  constructor(private gChartService : GoogleChartService) 
  { 
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages':['corechart','table']});
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit(): void 
  {
    let styleString = 'stroke-color: #ff4081; stroke-opacity: 0.6; stroke-width: 4; fill-color: #ff4081; fill-opacity: 0.2'
    this.g_arr.push(['Time', 'Signal', 's2',{role: 'style'}]);
    for(let i = 0; i < this.data.selections.length; i++)
    {
      this.g_arr.push(
        [
          this.data.selections[i][0], 
          this.data.selections[i][3],
          this.data.selections[i][1], 
          styleString
        ]);
    }

  }

  ngOnChanges()
  {

  }

  private drawChart()
  {

    // let col0 = (this.data.selections).map((val: any, idx: number) =>
    // {
    //   return (val[0]);
    // });

    // console.log(col0)
    let data = this.gLib.visualization.arrayToDataTable(this.g_arr);

    let chart = new this.gLib.visualization.LineChart(document.getElementById('divBarChart' + this.data._id + this.x));

    chart.draw(data, {legend: 'none', curveType: 'none'}); //series:{1: {curveType: 'function'}}
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) 
  {
    this.drawChart();
  }

}
