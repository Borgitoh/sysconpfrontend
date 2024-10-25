import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent {
  isCreateModalOpen = false;
  searchControl = new FormControl('');
  filteredVenda: any[] = [];
  dropdownOpenIndex : number | null = null;
  selectedVenda: any = null;

  constructor(private vendasService: VendasService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredVenda = this.filteredVenda.filter(project =>
        project.name.toLowerCase().includes(value?.toLowerCase())
      );
    });
  }

  ngOnInit() {
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  addVenda(venda:any){
    if(this.selectedVenda){
      this.vendasService.addVenda(venda).subscribe(
        (_: any) => {
            this.closeCreateModal();
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
    }else{
      this.vendasService.editStatusVenda(venda, venda.id).subscribe(
        (_: any) => {
            this.closeCreateModal();
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
    }

  }

  getProjetos(){
    this.vendasService.getVendas().subscribe(
      (data: any) => {
        this.filteredVenda = data
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  toggleDropdown(index: number) {
    this.dropdownOpenIndex = this.dropdownOpenIndex === index ? null : index;
  }

  onEdit(venda:any) {
    this.dropdownOpenIndex = null;
    this.selectedVenda = venda
    this.isCreateModalOpen = true;
  }

  onDelete() {
    this.dropdownOpenIndex = null;
  }

}
