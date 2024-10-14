import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SysconpRoutingModule } from './sysconp-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Briefcase, CalendarDays, Clock3, File, FileIcon, FileText, Home, LucideAngularModule, Menu, ShoppingCart, UserCheck, Users } from 'lucide-angular';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    LucideAngularModule.pick({ Home, CalendarDays, Briefcase, FileText, Users, ShoppingCart, Clock3 }), 
    CommonModule,
    SysconpRoutingModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysconpModule {
  readonly FileIcon = FileIcon;
 }
