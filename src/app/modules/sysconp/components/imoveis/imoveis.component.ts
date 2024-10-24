import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Projects } from '../../enums/module.data';
import { ImoveisService } from '../../service/imoveis.service';
import { TipoImoveisService } from '../../service/tipo-imoveis.service';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.scss']
})
export class ImoveisComponent {
  isCreateModalOpen = false;
  isCreateModalOpenTipo = false;
  searchControl = new FormControl('');
  filteredProjects: any[] = [];
  dropdownOpenIndex : number | null = null;
  selectedTipoImovel: any = null;
  selectedImovel: any = null;

  constructor(private imoveisService: ImoveisService,
             private tipoImoveisService:TipoImoveisService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredProjects = Projects.filter(project =>
        project.name.toLowerCase().includes(value?.toLowerCase())
      );
    });

    this.getImovel();
  }

  ngOnInit() {
  }

  addImovel(imovel:any){
    this.imoveisService.addImovel(imovel).subscribe(
      (_: any) => {
          this.closeCreateModal();
          this.getImovel();
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  calculateParcela(finalityValue: number, initialValue: number, installment: number){
    const totalAmount = finalityValue - initialValue;
    return Math.ceil(totalAmount / installment);
  }

  calculateYears(installments: number): number {
    return Math.floor(installments / 12);
  }

  calculateRemainingMonths(installments: number): number {
    return installments % 12;
  }

  getImovel(){
    this.imoveisService.getImoveis().subscribe(
      (data: any) => {
         this.filteredProjects = data;
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  addTipoImovel(imovel:any){
    this.tipoImoveisService.addTipoImovel(imovel).subscribe(
      (_: any) => {
          this.closeCreateModalTipo();
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  openCreateModalTipo() {
    this.isCreateModalOpenTipo = true;
  }

  closeCreateModalTipo() {
    this.isCreateModalOpenTipo = false;
  }

  toggleDropdown(index: number) {
    this.dropdownOpenIndex = this.dropdownOpenIndex === index ? null : index;
  }

  onEdit(imovel:any) {
    this.dropdownOpenIndex = null;
    this.selectedImovel =imovel
    this.isCreateModalOpen = true;
  }

  onDelete() {
    this.dropdownOpenIndex = null;
  }

}
