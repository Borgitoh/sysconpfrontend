import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projeto-modal',
  templateUrl: './projeto-modal.component.html',
  styleUrls: ['./projeto-modal.component.scss']
})
export class ProjetoModalComponent {
  @Output() close = new EventEmitter<void>(); 
  @Output() addProjeto = new EventEmitter<any>();
  projectForm: FormGroup;

  onClose() {
    this.close.emit();
  }


  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.addProjeto.emit(this.projectForm.value)
      this.projectForm.reset();
    } else {
      this.projectForm.markAllAsTouched();
    }
  }
}
