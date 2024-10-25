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
        this.venda.parcela = this.valor 
        this.EnviaVenda( this.venda);        
      } else {
        console.error('Venda não é um objeto válido:', venda);
      }
    }

    getVendas(id:any){
      this.vendasService.getVendaId(id).subscribe(
        (data: any) => {
          
          this.venda = data;
          this.parcelas = data.parcela[0].parcelas
            this.imovel = data.imovel.find((imovel:any)=> imovel.name === this.parcelas[0].imovelName )
           console.log(this.imovel);
          
            if(this.parcelas.length){
             this.totalValor = this.parcelas.reduce((total: number, parcela: any) => {
              return total + (parcela.valor || 0); 
            }, 0);
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

    closeCreateModal() {
      this.isCreateModalOpen = false;
    }

  }
