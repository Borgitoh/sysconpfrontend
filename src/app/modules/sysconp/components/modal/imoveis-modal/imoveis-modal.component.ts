import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoImoveisService } from '../../../service/tipo-imoveis.service';
import { ProjectoService } from '../../../service/projecto.service';

@Component({
  selector: 'app-imoveis-modal',
  templateUrl: './imoveis-modal.component.html',
  styleUrls: ['./imoveis-modal.component.scss']
})
export class ImoveisModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addTipoImovel = new EventEmitter<any>();
  @Input() selectedTipoImovel: any;

  tipoImoveis: any[] = []
  filteredProjects : any[] = []
  ImovelForm: FormGroup;

  constructor(private fb: FormBuilder,
              private tipoImoveisService: TipoImoveisService,
              private projectoService: ProjectoService) {
    this.ImovelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      typePropertyId: ['', Validators.required],
      initialValue: ['', Validators.required],
      installment: ['', Validators.required],
      finalityValue: ['', Validators.required]
    });
    this.getTipoImoveis()
    this.getProjetos();
  }

  onClose() {
    this.close.emit();
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

  getProjetos(){
    this.projectoService.getProjectos().subscribe(
      (data: any) => {
        this.filteredProjects = data
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedTipoImovel) {
      this.ImovelForm.patchValue(this.selectedTipoImovel);
    }
  }

  onSubmit() {
    if (this.ImovelForm.valid) {
      this.addTipoImovel.emit(this.ImovelForm.value)
      this.ImovelForm.reset();
    } else {
      this.ImovelForm.markAllAsTouched();
    }
  }
}
