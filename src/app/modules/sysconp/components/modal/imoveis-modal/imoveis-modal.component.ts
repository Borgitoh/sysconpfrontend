import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoImoveisService } from '../../../service/tipo-imoveis.service';
import { ProjectoService } from '../../../service/projecto.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-imoveis-modal',
  templateUrl: './imoveis-modal.component.html',
  styleUrls: ['./imoveis-modal.component.scss'],
  providers: [CurrencyPipe]
})
export class ImoveisModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addImovel = new EventEmitter<any>();
  @Input() selectedTipoImovel: any;

  tipoImoveis: any[] = []
  filteredProjects : any[] = []
  ImovelForm: FormGroup;

  constructor(private fb: FormBuilder,
              private tipoImoveisService: TipoImoveisService,
              private projectoService: ProjectoService,
              private currencyPipe: CurrencyPipe) {
    this.ImovelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      typePropertyId: ['', Validators.required],
      projectId: ['', Validators.required],
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
      this.addImovel.emit(this.ImovelForm.value)
      this.ImovelForm.reset();
    } else {
      this.ImovelForm.markAllAsTouched();
    }
  }

  formatCurrency(field: string): void {
    const control = this.ImovelForm.get(field);
    if (control && control.value) {
      const formattedValue = this.currencyPipe.transform(control.value, 'AOA', 'symbol', '1.2-2');
      control.setValue(formattedValue);
    }
  }

  allowOnlyNumbers(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = (Number(value) / 100).toFixed(2).replace('.', ',');
    event.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
