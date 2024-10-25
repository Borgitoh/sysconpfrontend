import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendasService } from '../../service/vendas.service';
import { ImoveisService } from '../../service/imoveis.service';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent {
  isCreateModalOpen = false;
  isModalDocumento = false
  searchControl = new FormControl('');
  filteredVenda: any[] = [];
  dropdownOpenIndex : number | null = null;
  selectedVenda: any = null;
  selectedImovel: any = null;
  selectedCliente:  any = null;
  totalParcela:number = 0

  constructor(private vendasService: VendasService,
              private imoveisService: ImoveisService,
              private usuario: UsuarioService,
              private router: Router) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredVenda = this.filteredVenda.filter(project =>
        project.name.toLowerCase().includes(value?.toLowerCase())
      );
    });
  }

  ngOnInit() {
    this.getVendas();
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  openModalDocumento(venda:any) {
    this.isModalDocumento = true;
    this.selectedVenda = venda
  }

  closeModalDocumento() {
    this.isModalDocumento = false;
  }

  addVenda(venda:any){
   this.getImovel(venda)
  }

  adicionarVendas(venda:any){
    venda.imovel.push(this.selectedImovel) 
    venda.cliente = this.selectedCliente
    this.vendasService.addVenda(venda).subscribe(
      (_: any) => {
        this.editStatusImovel(this.selectedImovel)
          this.closeCreateModal();
          this.getVendas()
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  editStatusImovel(imovel:any){
      this.imoveisService.statusImovel(imovel,imovel.id).subscribe(
        (_: any) => {
          console.log('Erro ao projec');
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
  }

  getImovel(venda:any):any{
    this.imoveisService.getImoveisId(venda.imovel).subscribe(
      (data: any) => {
       this.selectedImovel =data;
       this.selectedImovel.iscupado = true;
       this.editStatusImovel(this.selectedImovel)
       this.getCliente(venda)
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  getCliente(venda:any):any{
    this.usuario.getClienteId(venda.cliente).subscribe(
      (data: any) => {
       this.selectedCliente =data;
       this.adicionarVendas(venda)
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  getVendas(){
    this.vendasService.getVendas().subscribe(
      (data: any) => {
        this.filteredVenda= data;
        console.log(data);
        
        this.totalParcela = data[0].parcela[0].parcelas.length 
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

  goConta(user:any){
    this.router.navigate(['sysconp/conta/'+user.uuid]);
  }

  gopParcela(venda:any){
    this.router.navigate(['sysconp/parcelas/'+venda.id]);
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
