import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VendasService } from '../../../service/vendas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parcelas-modal',
  templateUrl: './parcelas-modal.component.html',
  styleUrls: ['./parcelas-modal.component.scss']
})
export class ParcelasModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addVenda = new EventEmitter<any>();

  parcelas: FormGroup;
  parcelasAdicionadas: any[] = []; 
  selectedFile: File | null = null;
  filePreview: SafeResourceUrl | null = null;
  errorMessage: string | null = null;
  isImage: boolean = false;
  isPdf: boolean = false;
  isDisabled: boolean = true;
  isDisabledButton :boolean = true;
  imoveis: any[] = [];

  constructor(private fb: FormBuilder, 
              private sanitizer: DomSanitizer,
              private vendasService: VendasService,
              private route: ActivatedRoute,) {
    this.parcelas = this.fb.group({
      valor: ['', Validators.required],
      imovel: ['', Validators.required],
      file: ['', Validators.required],
      total: ['', ]
    });

    this.parcelas.get('imovel')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedImovel = this.imoveis.find(imovel => imovel.id === value)
        this.parcelas.get('valor')?.setValue(selectedImovel.installment)
        this.isDisabledButton=false;
        this.addParcela();
      }
    });

    this.route.paramMap.subscribe(params => {
      this.getVendas(params.get('id'))
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];

    if (file && allowedTypes.includes(file.type)) {
      this.selectedFile = file;
      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
      };
      reader.readAsDataURL(file);

      this.isImage = file.type.startsWith('image');
      this.isPdf = file.type === 'application/pdf';
    } else {
      this.selectedFile = null;
      this.filePreview = null;
      this.errorMessage = 'Apenas arquivos PDF, PNG e JPEG são permitidos.';
    }
  }

  onClose() {
    this.close.emit();
  }

  obterDataHoje(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    return `${dia}/${mes}/${ano}`; 
  }
  addParcela() {
    
    if (this.parcelas.get('imovel')?.value) {
      const selectedImovel = this.imoveis.find(imovel => imovel.id === this.parcelas.get('imovel')?.value);
      const valorAtual = this.parcelas.get('valor')?.value;
      const valorNumerico = parseFloat(valorAtual) || 0; 
      const newParcela = {
        imovelName: selectedImovel?.name,
        valor: valorNumerico,
        status: 'Pago',
        data :this.obterDataHoje()
      };
      const totalValor = (this.parcelas.get('total')?.value || 0) + valorNumerico;
      this.parcelas.get('total')?.setValue(totalValor); 
      this.parcelasAdicionadas.push(newParcela); 
    }
     
  }

  getVendas(id:any){
    this.vendasService.getVendaId(id).subscribe(
      (data: any) => {
        
        this.imoveis= data.imovel;
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  removerParcela(index: number) {
    const valorRemovido = this.parcelasAdicionadas[index]; 

    this.parcelasAdicionadas.splice(index, 1);
 
    const valorAtualizado = this.parcelasAdicionadas.reduce((sum, parcela) => sum + parcela.valor, 0);
    this.parcelas.get('total')?.setValue(valorAtualizado);
  }

  onSubmit() {
    if (this.parcelas.valid && this.selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64File = reader.result as string;

        const venda = {
          file: base64File,
          parcelas: this.parcelasAdicionadas
        };

        this.addVenda.emit(venda);
      };

      reader.onerror = () => {
        this.errorMessage = 'Erro ao processar o arquivo. Tente novamente.';
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.errorMessage = 'Por favor, complete todos os campos e selecione um arquivo.';
    }
  }
}
