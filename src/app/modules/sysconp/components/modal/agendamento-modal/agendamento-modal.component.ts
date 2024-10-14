import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrls: ['./agendamento-modal.component.scss'],
})
export class AgendamentoModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addNewAppointment = new EventEmitter<any>();
  @Input() selectedAppointment: any;

  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      client: ['', Validators.required],
      project: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['Pending'],
    });
  }

  ngOnInit() {
    if (this.selectedAppointment) {
      this.appointmentForm.setValue(this.selectedAppointment);
      this.appointmentForm.patchValue(this.selectedAppointment);
    }
  }

  addAppointment() {
    if (this.appointmentForm.valid) {
      const newAppointment = this.appointmentForm.value;
      this.addNewAppointment.emit(newAppointment);
      console.log('Agendamento adicionado ou editado:', newAppointment);
      // Emitir evento para fechar o modal
      this.closeModal.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
