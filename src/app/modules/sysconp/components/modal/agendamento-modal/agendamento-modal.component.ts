import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectoService } from '../../../service/projecto.service';

@Component({
  selector: 'app-agendamento-modal',
  templateUrl: './agendamento-modal.component.html',
  styleUrls: ['./agendamento-modal.component.scss'],
})
export class AgendamentoModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addNewAppointment = new EventEmitter<any>();
  @Input() selectedAppointment: any;
  projectos :any = null;
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private projectoService:ProjectoService) {
    this.appointmentForm = this.fb.group({
      client: ['', Validators.required],
      numero:['', Validators.required],
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
    this.getProjectos();
  }
  getProjectos(){
    this.projectoService.getProjecto().subscribe(
      (data) => {
       this.projectos = data;
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    );
  }
  addAppointment() {
    if (this.appointmentForm.valid) {
      const newAppointment = this.appointmentForm.value;
      this.addNewAppointment.emit(newAppointment);
      console.log('Agendamento adicionado ou editado:', newAppointment);
      this.closeModal.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
