import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProjetosComponent } from './components/projetos/projetos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent }, 
      { path: 'agendamentos', component: AgendamentoComponent }, 
      { path: 'usuario', component: UsuarioComponent },
      { path: 'projecto', component: ProjetosComponent }, 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysconpRoutingModule { }
