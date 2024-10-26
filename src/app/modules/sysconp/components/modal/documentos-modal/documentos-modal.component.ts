import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { VendasService } from '../../../service/vendas.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-documentos-modal',
  templateUrl: './documentos-modal.component.html',
  styleUrls: ['./documentos-modal.component.scss']
})
export class DocumentosModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() selectedVenda : any
  dadoPdf : any
  faturaHtml = false
  contHtml :any 

  constructor(private vendasService: VendasService) {

    this.vendasService.getDocumentoBy("fatura").subscribe(
      (data: any) => {
        const dado =data[0].body;
        this.faturaHtml= true
        this.contHtml = this.substituirVariavel(dado,'[DATA_HOJE]',this.obterDataHoje())
        this.contHtml = this.substituirVariavel(this.contHtml,'[VALOR_PAGO]',this.selectedVenda.imovel[0].initialValue)
        this.contHtml = this.substituirVariavel(this.contHtml,'[NUMERO_DE_PRESTACAO]',  this.calculateParcela(this.selectedVenda.imovel[0].finalityValue, this.selectedVenda.imovel[0].initialValue, this.selectedVenda.imovel[0].installment))
        this.contHtml = this.substituirVariavel(this.contHtml,'[NOME_DO_IMOVEL]', this.selectedVenda.imovel[0].name)
        this.contHtml = this.substituirVariavel(this.contHtml,'[NOME_CLIENTE]', this.selectedVenda.cliente[0].name)
        this.contHtml = this.substituirVariavel(this.contHtml,'[ENDERECO_CLIENTE]',this.selectedVenda.cliente[0].provincia.split(';')[1]+','+this.selectedVenda.cliente[0].municipio.split(';')[1]+','+this.selectedVenda.cliente[0].distrito.split(';')[1]+','+ this.selectedVenda.cliente[0].bairro.split(';')[1])
        this.contHtml = this.substituirVariavel(this.contHtml,'[NUMERO_DO_CLIENTE]',this.selectedVenda.cliente[0].phone)
        this.contHtml = this.substituirVariavel(this.contHtml,'[VALOR_GLOBAL]',this.selectedVenda.imovel[0].finalityValue);
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedVenda) {
      console.log(this.selectedVenda);
      console.log(this.obterDataHoje());
      
      this.dadoPdf = {
        valorGlobal: this.selectedVenda.imovel.finalityValue,
        valorPaga: this.selectedVenda.imovel.initialValue,
        numeroDePrestacao: this.calculateParcela(this.selectedVenda.imovel.finalityValue, this.selectedVenda.imovel.initialValue, this.selectedVenda.imovel.installment),
        nomeDoImovel: this.selectedVenda.imovel.name,
        nomedoClinete: this.selectedVenda.cliente[0].name,
        numeroDoCliente: this.selectedVenda.cliente[0].phone,
        EnderecoDoCliente: this.selectedVenda.cliente[0].provincia.split(';')[1]+','+this.selectedVenda.cleinte[0].municipio.split(';')[1]+','+this.selectedVenda.cleinte[0].distrito.split(';')[1]+','+ this.selectedVenda.cleinte[0].bairro.split(';')[1]
      }
    }
  }

  calculateParcela(finalityValue: number, initialValue: number, installment: number){
    const totalAmount = finalityValue - initialValue;
    return Math.ceil(totalAmount / installment);
  }

  obterDataHoje(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`; 
  }

  onClose() {
    this.close.emit();
  }

  getFatura(){
    console.log(this.contHtml);
    
    this.gerarPDF(this.contHtml)
  }

  substituirVariavel(template: string, nomeVariavel: string, valor: any): string {
    return template.replace(nomeVariavel, valor); 
  }


  gerarPDF(faturaHtml: any) {
    if (!faturaHtml) {
      console.error('HTML da fatura não disponível.');
      return;
    }
  
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const element = document.createElement('div');
    element.classList.add('w-full', 'flex', 'justify-between');
    element.innerHTML = faturaHtml;
    document.body.appendChild(element);
  
    setTimeout(() => {
      html2canvas(element, { scale: 2 }).then(canvas => { 
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth() - 20; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pdf.internal.pageSize.height;
        }
  
        pdf.save('fatura.pdf');
        document.body.removeChild(element);
      }).catch(error => {
        console.error('Erro ao gerar o canvas:', error);
        document.body.removeChild(element);
      });
    }, 100);
  }  
}
