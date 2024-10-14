import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SysconpRoutingModule } from './sysconp-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Briefcase, CalendarDays, CheckCheck, CircleSlash, Clock3, Download, Edit, Ellipsis, File, FileIcon, FileText, Home, Lock, LucideAngularModule, Menu, Pencil, Plus, ShoppingCart, Trash2, UserCheck, Users } from 'lucide-angular';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { AgendamentoModalComponent } from './components/modal/agendamento-modal/agendamento-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    AgendamentoComponent,
    AgendamentoModalComponent,
    SpinnerComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule.pick({  Edit, Trash2, Plus, Ellipsis, Home, CalendarDays, Briefcase, FileText, Users, ShoppingCart, Clock3,  Download, CheckCheck, Pencil, CircleSlash, Menu, Lock}), 
    SysconpRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysconpModule {
  readonly FileIcon = FileIcon;
 }
