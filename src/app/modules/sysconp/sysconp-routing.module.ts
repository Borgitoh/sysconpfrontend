import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AgendamentoComponent } from './components/agendamento/agendamento.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Usando HomeComponent como contêiner
    children: [
      { path: '', component: DashboardComponent }, // Rota padrão para o Dashboard
      { path: 'agendamentos', component: AgendamentoComponent }, // Rota para agendamentos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysconpRoutingModule { }
