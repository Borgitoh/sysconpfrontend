import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoImoveisService } from '../../../service/tipo-imoveis.service';

@Component({
  selector: 'app-tipo-imoveis-modal',
  templateUrl: './tipo-imoveis-modal.component.html',
  styleUrls: ['./tipo-imoveis-modal.component.scss']
})
export class TipoImoveisModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addTipoImovel = new EventEmitter<any>();
  @Input() selectedTipoImovel: any;

  ImovelForm: FormGroup;
  novoItem: boolean = false
  tipoImoveis: any[] = [];

  constructor(private fb: FormBuilder,
    private tipoImoveisService: TipoImoveisService,) {
    this.ImovelForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getTipoImoveis();
  }

  onClose() {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedTipoImovel) {
      this.ImovelForm.patchValue(this.selectedTipoImovel);
    }
  }

  getTipoImoveis(){
    this.tipoImoveisService.getTipoImoveis().subscribe(
      (data: any) => {
        this.tipoImoveis = data

      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  addNovoItem(){
    this.novoItem = !this.novoItem
  }

  addImovel(imovel:any){
    this.tipoImoveisService.addTipoImovel(imovel).subscribe(
      (_: any) => {
        this.getTipoImoveis();
        this.addNovoItem();
      },
      (error) => {
        console.error('Erro ao projecto:', error);
      }
    );
  }

  onSubmit() {
    if (this.ImovelForm.valid) {
      this.addImovel(this.ImovelForm.value)
      this.ImovelForm.reset();
    } else {
      this.ImovelForm.markAllAsTouched();
    }
  }

}
