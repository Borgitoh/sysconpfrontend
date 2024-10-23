import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.ImovelForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  onClose() {
    this.close.emit();
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
