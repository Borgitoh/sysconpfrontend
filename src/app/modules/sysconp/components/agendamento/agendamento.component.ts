import { Component } from '@angular/core';
import { AgendamentoService } from '../../service/agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent {
  public appointments: any[] = [];
  isModalOpen = false;
  selectedAppointment: any = null; 
  index = 0; 

  constructor(private agendamentoService: AgendamentoService) {}

  ngOnInit() {
    this.getAppointments(); // Chama o método ao inicializar o componente
  }

  getAppointments() {
    this.agendamentoService.getAppointments().subscribe(
      (data) => {
        this.appointments = data.map(appointment => ({
          client: appointment.name, 
          project: appointment.name, 
          date: appointment.visitDate, 
          time: appointment.visitTime, 
          status: appointment.status ? 'Confirmado' : 'Pendente' 
        }));
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addNewAppointment(appointment: any) {
    this.appointments.push(appointment); 
    this.closeModal();
  }

  editAppointment(appointment: any, index: number) {
    this.selectedAppointment = appointment; 
    this.index = index;
    this.isModalOpen = true; 
  }

  toggleDropdown(index: number) {
    const dropdown = document.getElementById(`dropdown-${index}`);
    if (dropdown) dropdown.classList.toggle('hidden');
  }
}
