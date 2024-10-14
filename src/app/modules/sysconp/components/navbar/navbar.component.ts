import { Component } from '@angular/core';
import { Router } from '@angular/router';
import navigationLinks from '../../enums/navigationLinks';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  sidebarOpen = false;
  showNotifications = false;
  showUserMenu = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
