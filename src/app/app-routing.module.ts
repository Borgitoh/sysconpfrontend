import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ResetSenhaComponent } from './page/reset-senha/reset-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'senha/:id', component: ResetSenhaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'sysconp',
    loadChildren: () => import('./modules/sysconp/sysconp.module').then(m => m.SysconpModule),
  },
  { path: '**', redirectTo: '/login' } // Rota não encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
