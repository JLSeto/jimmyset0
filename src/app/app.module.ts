import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { GoogleChartModule } from './google-chart/google-chart.module';
import { MaterialModule } from './helpers/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// import { ChartsModule } from 'ng2-charts';

import { NavbarComponent } from './navbar/navbar.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ProjectsComponent } from './projects/projects.component';
import { DisplayDatePipe } from './helpers/pipes/displayDate.pipe';
import { iFrameView } from './projects/iframe-view';
import { FroggerComponent } from './frogger/frogger.component';
import { BlogComponent } from './blog/blog.component';
import { TestComponent } from './test/test.component';
import { CalculatorComponent } from './calculator/calculator.component'

import { OnlyNumber } from './helpers/directives/onlynumber.directive';
import { PlaygroundComponent } from './playground/playground.component';

@NgModule({
  declarations: 
  [
    AppComponent,
    NavbarComponent,
    FrontpageComponent,
    ProjectsComponent,
    DisplayDatePipe,
    iFrameView,
    FroggerComponent,
    BlogComponent,
    TestComponent,
    CalculatorComponent,
    OnlyNumber,
    PlaygroundComponent
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartModule
    // ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
