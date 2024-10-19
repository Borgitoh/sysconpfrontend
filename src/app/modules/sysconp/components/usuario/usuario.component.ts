import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {
  searchTerm: string = '';
  filteredUsers: any[] = [];
  dropdownOpen: number | null = null;
  isModalOpen = false;
  selectedUsuario: any = null;

  constructor(private usuarioService: UsuarioService) {
    this.getUsuario();
  }

  filterUsers() {
    this.filteredUsers = this.filteredUsers.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editUsuario(usuario:any) {
    this.selectedUsuario = usuario
    this.selectedUsuario.code = usuario.permission[0].code
    this.isModalOpen = true;
  }

  getUsuario() {
    this.usuarioService.getUsuarios().subscribe(
      (data: any) => {
        this.filteredUsers = data
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
  }

  onCreateUser() {
    this.isModalOpen = true;
  }

  addUsuario(usuario: any) {
    this.closeModal();
    if(!this.selectedUsuario){
      this.usuarioService.addUsuario(usuario).subscribe(
        (_) => {
          this.getUsuario();
        },
        (error) => {
          console.error('Erro ao usaurio:', error);
        }
      );
    }else{
      this.usuarioService.editUsuario(usuario, this.selectedUsuario.uuid).subscribe(
        (_) => {
          this.getUsuario();
        },
        (error) => {
          console.error('Erro ao usaurio:', error);
        }
      );
    }

    this.selectedUsuario = null

  }

  getInitials(nome: any) {
    if (!nome) return '';

    const nomeParts = nome.trim().split(' ');

    if (nomeParts.length === 1) {
      return nomeParts[0];
    }

    const firstnome = nomeParts[0];
    const lastnome = nomeParts[nomeParts.length - 1];
    const initials = firstnome[0].toUpperCase() + (lastnome ? lastnome[0].toUpperCase() : '');

    return initials;
  }

  getPermissaoDescriaco(PermissaoCode: string) {

    const PermissaoMap: { [key: string]: string } = {
      'WC_PEDROMAG_MOD_ADMINISTRACAO': 'Administrador',
      'PEDROMAG_MOD_CJ': 'Conselho Jurídico',
      'WC_PS_PEDROMAG_ANA_VAL': 'Chefe de Departamento',
      'WC_PS_PEDROMAG_ANA_ANA': 'Analista Comercial',
      'notificante': 'Cliente'
    };
    return PermissaoMap[PermissaoCode] || PermissaoCode;
  }

  getFilteredPermissions(permissaos: any[]): string[] {
    return permissaos.map((permission: any) => {
      return this.getPermissaoDescriaco(permission.code);
    });
  }

}
