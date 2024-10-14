import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  bgImage = 'assets/img/fundo.png';
  sidebarOpen = false;
  showNotifications = false;
  showUserMenu = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
