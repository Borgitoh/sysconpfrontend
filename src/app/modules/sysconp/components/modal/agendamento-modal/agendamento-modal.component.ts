import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrls: ['./agendamento-modal.component.scss'],
})
export class AgendamentoModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addNewAppointment = new EventEmitter<any>()
  appointmentForm: FormGroup;
  appointment: any = {  // Adicione esta linha
    client: '',
    project: '',
    date: '',
    time: '',
    status: 'Pending',
  };

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      client: ['', Validators.required],
      project: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['Pending'],
    });
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      const newAppointment = this.appointmentForm.value;
      this.addNewAppointment.emit(newAppointment);
      console.log('Agendamento adicionado:', newAppointment);
      // Emitir evento para fechar o modal
      this.closeModal.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
