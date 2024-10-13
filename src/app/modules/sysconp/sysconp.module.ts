import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SysconpRoutingModule } from './sysconp-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SysconpRoutingModule,
    RouterModule
  ]
})
export class SysconpModule {
 }
