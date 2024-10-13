import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  bgImage = 'assets/img/fundo.png'; // Atualize o caminho da imagem
  recentSales = [
    {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      avatar: '/avatars/01.png',
      amount: '+ 1.999,00 Kz'
    },
    {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      avatar: '/avatars/02.png',
      amount: '+ 39,00 Kz'
    },
    {
      name: 'Isabella Nguyen',
      email: 'isabella.nguyen@email.com',
      avatar: '/avatars/03.png',
      amount: '+ 299,00 Kz'
    },
    {
      name: 'William Kim',
      email: 'will@email.com',
      avatar: '/avatars/04.png',
      amount: '+ 99,00 Kz'
    },
    {
      name: 'Sofia Davis',
      email: 'sofia.davis@email.com',
      avatar: '/avatars/05.png',
      amount: '+ 39,00 Kz'
    },
  ];
}
