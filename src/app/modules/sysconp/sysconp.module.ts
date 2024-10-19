import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SysconpRoutingModule } from './sysconp-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Briefcase, CalendarDays, CheckCheck, CircleSlash, Clock3, Download, Edit, Ellipsis, Eye, EyeOff, File, FileIcon, FileText, Home, Lock, LucideAngularModule, Menu, Pencil, Plus, Settings, ShoppingCart, Trash2, UserCheck, Users } from 'lucide-angular';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { AgendamentoModalComponent } from './components/modal/agendamento-modal/agendamento-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './components/usuario/usuario.component';
import localePt from '@angular/common/locales/pt';
import { UsuarioModalComponent } from './components/modal/usuario-modal/usuario-modal.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { ProjetoModalComponent } from './components/modal/projeto-modal/projeto-modal.component';
import { TokenInterceptor } from './token.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { ModulosComponent } from './components/modulos/modulos.component';
import { MudulosModalComponent } from './components/modal/mudulos-modal/mudulos-modal.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';
registerLocaleData(localePt);
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    AgendamentoComponent,
    AgendamentoModalComponent,
    SpinnerComponent,
    UsuarioComponent,
    UsuarioModalComponent,
    ProjetosComponent,
    ProjetoModalComponent,
    ModulosComponent,
    MudulosModalComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LucideAngularModule.pick({Settings, Edit, Trash2, Plus, Ellipsis, Home, CalendarDays, Briefcase, FileText, Users, ShoppingCart, Clock3,  Download, CheckCheck, Pencil, CircleSlash, Menu, Lock, EyeOff , Eye}),
    SysconpRoutingModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [SpinnerComponent],
  providers: [ DatePipe,
    { provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass:  TokenInterceptor,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysconpModule {
  readonly FileIcon = FileIcon;
 }
