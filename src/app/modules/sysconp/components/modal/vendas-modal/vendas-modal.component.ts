import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImoveisService } from '../../../service/imoveis.service';
import { UsuarioService } from '../../../service/usuario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vendas-modal',
  templateUrl: './vendas-modal.component.html',
  styleUrls: ['./vendas-modal.component.scss']
})
export class VendasModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addVenda = new EventEmitter<any>();

  vendas: FormGroup;
  imoveis: any[] = [];
  clientes: any[] = [];
  selectedFile: File | null = null;
  filePreview: SafeResourceUrl | null = null;
  errorMessage: string | null = null;
  isImage: boolean = false;
  isPdf: boolean = false;

  constructor(
    private fb: FormBuilder,
    private imoveisService: ImoveisService,
    private usuarioService: UsuarioService,
    private sanitizer: DomSanitizer
  ) {
    this.vendas = this.fb.group({
      cliente: ['', Validators.required],
      imovel: ['', Validators.required],
      file: ['', Validators.required]
    });
    this.getImoveis();
    this.getUsuario();
  }

  getImoveis() {
    this.imoveisService.getImoveisOcupado().subscribe(
      (data: any) => {
        this.imoveis = data;
      },
      (error) => {
        console.error('Erro ao buscar imóveis:', error);
      }
    );
  }

  getUsuario() {
    this.usuarioService.getUsuarios().subscribe(
      (data: any) => {
        this.clientes = data.filter((usuario: any) =>
          usuario.permission.some((perm: any) => perm.code === 'notificante')
        );
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
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

      if (file.type.startsWith('image')) {
        this.isImage = true;
        this.isPdf = false;
      } else if (file.type === 'application/pdf') {
        this.isImage = false;
        this.isPdf = true;
      }
    } else {
      this.selectedFile = null;
      this.filePreview = null;
      this.errorMessage = 'Apenas arquivos PDF, PNG e JPEG são permitidos.';
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.vendas.valid && this.selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64File = reader.result as string;

        const venda = {
          cliente: this.vendas.get('cliente')?.value,
          imovel: this.vendas.get('imovel')?.value,
          file: base64File
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
