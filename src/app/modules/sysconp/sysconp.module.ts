import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SysconpRoutingModule } from './sysconp-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Briefcase, CalendarDays, CheckCheck, CircleSlash, Clock3, Download, Ellipsis, File, FileIcon, FileText, Home, LucideAngularModule, Menu, Pencil, ShoppingCart, UserCheck, Users } from 'lucide-angular';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    AgendamentoComponent
  ],
  imports: [
    LucideAngularModule.pick({ Home, CalendarDays, Briefcase, FileText, Users, ShoppingCart, Clock3,  Download, CheckCheck, Pencil, CircleSlash, Ellipsis}), 
    CommonModule,
    SysconpRoutingModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysconpModule {
  readonly FileIcon = FileIcon;
 }
