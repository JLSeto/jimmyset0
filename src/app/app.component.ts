import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HelperService } from './helpers/services/helper.service';
import { SidenavService } from './helpers/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent 
{
  title = 'JLSeto';
  @ViewChild('sidenav', {static: false}) public sidenav!: MatSidenav;
  
  constructor(public hS: HelperService, private sN: SidenavService)
  {
    this.hS.checkifMobile();
  }

  ngAfterViewInit(): void 
  {
    this.sN.setSidenav(this.sidenav); //Control the sidenav from navbar component
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) 
  {
    this.hS.setInnerDimensions({width: event.target.innerWidth, height: event.target.innerHeight});
    this.hS.checkifMobile();
  }

}
