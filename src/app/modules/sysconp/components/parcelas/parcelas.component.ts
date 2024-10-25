import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendasService } from '../../service/vendas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.component.html',
  styleUrls: ['./parcelas.component.scss']
})
export class ParcelasComponent {
  isCreateModalOpen = false;
  searchControl = new FormControl('');
  venda: any = {};
  valor: any[] = [];
  imovel: any[] = [];
  parcelas: any[] = [];
  totalValor: number= 0
  dataParcela = ""
  valorPercent = 0;
  quantidadeParcela =0


  constructor(private vendasService: VendasService,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.getVendas(params.get('id'))
    });
  }

    openCreateModal() {
      this.isCreateModalOpen = true;
    }

    addVenda(venda: any){
      if (venda && typeof venda === 'object') {
        this.isCreateModalOpen = false
        this.valor.push(venda)
        if(this.venda.parcela){
          this.addParcelas()
        }else{
          this.venda.parcela = this.valor  
        }
        this.EnviaVenda( this.venda);  
        this.valor= [];      
      } else {
        console.error('Venda não é um objeto válido:', venda);
      }
    }

    addParcelas(){
      for (let index = 0; index < this.valor[0].parcelas.length; index++) {
        this.venda.parcela[0].parcelas.push(this.valor[0].parcelas[index])
      }
    }

    getVendas(id:any){
      this.vendasService.getVendaId(id).subscribe(
        (data: any) => {
          
          this.venda = data;
          this.parcelas = data.parcela[0].parcelas
          this.imovel = data.imovel.find((imovel:any)=> imovel.name === this.parcelas[0].imovelName )
          
            if(this.parcelas.length){
             this.totalValor = this.parcelas.reduce((total: number, parcela: any) => {
              return total + (parcela.valor || 0); 
            }, 0);
            
            this.dataParcela = this.parcelas[this.parcelas.length -1].data
            this.quantidadeParcela = this.calculateParcela(data.imovel[0].finalityValue, data.imovel[0].initialValue, data.imovel[0].installment)
            this.valorPercent = Math.floor((this.parcelas.length/ this.quantidadeParcela)*100)
          }
       
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
    }

    EnviaVenda(venda:any){
      this.vendasService.editVenda(venda,venda.id).subscribe(
        (data: any) => {
          this.getVendas(venda.id)
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

    closeCreateModal() {
      this.isCreateModalOpen = false;
    }

  }
