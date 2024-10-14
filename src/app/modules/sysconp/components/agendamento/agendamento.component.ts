import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent {
  public appointments = [
    { client: 'Zenilda', project: 'Zenilda', date: '2024-10-14', time: '15:00', status: 'Pendente' },
  ];
  
  isModalOpen = false; 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addNewAppointment(appointment:any) {
    this.appointments.push(appointment); 
    this.closeModal();
  }
  toggleDropdown(index: number) {
    const dropdown = document.getElementById(`dropdown-${index}`);
    if (dropdown) dropdown.classList.toggle('hidden');
  }
}
