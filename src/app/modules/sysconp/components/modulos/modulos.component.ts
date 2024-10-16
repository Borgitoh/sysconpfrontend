import { Component } from '@angular/core';
import { ModulosService } from '../../service/modulos.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent {
  searchTerm: string = '';
  filteredmodulos: any[] = [];
  dropdownOpen: number | null = null;
  isModalOpen = false;

  constructor(private modulosService: ModulosService) {
    this.getModulos();
  }

  filteredModulos() {
    this.filteredmodulos = this.filteredmodulos.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getModulos() {
    this.modulosService.getModulos().subscribe(
      (data: any) => {
        this.filteredmodulos = data
      },
      (error:any) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  toggleDropdown(index: number) {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
  }

  onCreateModulos() {
    this.isModalOpen = true;
  }

  addModulo(modulo: any) {
    this.closeModal();
    this.modulosService.addModulo(modulo).subscribe(
      (_:any) => {
        this.getModulos();
      },
      (error:any) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

}
