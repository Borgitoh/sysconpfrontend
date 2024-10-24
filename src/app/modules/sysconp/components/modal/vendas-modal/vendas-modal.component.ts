import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImoveisService } from '../../../service/imoveis.service';
import { UsuarioService } from '../../../service/usuario.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-vendas-modal',
  templateUrl: './vendas-modal.component.html',
  styleUrls: ['./vendas-modal.component.scss']
})
export class VendasModalComponent {
  @Output() close = new EventEmitter<void>();
  novoItem: boolean = false;
  vendas: FormGroup;
  imoveis: any[] = [];
  clientes: any [] = [];
  selectedFile: File | null = null;
  filePreview: SafeResourceUrl | null = null;
  errorMessage: string | null = null;
  isImage: boolean = false;
  isPdf: boolean = false;

  constructor(private fb: FormBuilder,
     private imoveisService: ImoveisService,
     private usuarioService: UsuarioService,
     private sanitizer: DomSanitizer) {
    this.vendas = this.fb.group({
      cliente: ['', Validators.required],
      imovel: ['', Validators.required],
      file: ['', Validators.required]
    });
    this.getImoveis();
    this.getUsuario();
  }

  getImoveis(){
    this.imoveisService.getImoveis().subscribe(
      (data: any) => {
         this.imoveis = data;
      },
      (error) => {
        console.error('Erro ao projecto:', error);
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

      if (file.type.startsWith('image')) {
        this.isImage = true;
        this.isPdf = false;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        this.isImage = false;
        this.isPdf = true;
        // Preview do PDF via <iframe>
        this.filePreview = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
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
  onSubmit(){

  }
}
