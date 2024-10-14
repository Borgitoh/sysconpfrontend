import { Component } from '@angular/core';
import { UsersData } from '../../enums/module.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  searchTerm: string = '';
  filteredUsers = UsersData;
  dropdownOpen: number | null = null;

  // Filtrar usuários com base no termo de pesquisa
  filterUsers() {
    this.filteredUsers = UsersData.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Alternar dropdown do menu
  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
  }

  // Função de criação de usuário
  onCreateUser() {
    // Lógica de criação de usuário
  }
}
