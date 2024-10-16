import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
      phone:['', Validators.required],
      project: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['Pending'],
    });
  }

  ngOnInit() {
     this.getProjectos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedAppointment) {
      this.appointmentForm.patchValue(this.selectedAppointment);
    }
  }

  getProjectos(){
    this.projectoService.getProjectos().subscribe(
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
        this.addNewAppointment.emit(this.appointmentForm.value);
       this.closeModal.emit();
    }
  }

  close() {
    this.closeModal.emit();
  }
}
