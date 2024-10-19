import { Component } from '@angular/core';
import { AgendamentoService } from '../../service/agendamento.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent {
  appointments: any[] = [];
  allAppointments: any[] = [];
  searchTerm: string = '';
  isModalOpen = false;
  selectedAppointment: any = null;
  index = 0;

  constructor(private agendamentoService: AgendamentoService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.agendamentoService.getAppointments().subscribe(
      (data) => {
        this.appointments = data.map(appointment => ({
          client: appointment.name,
          project: appointment.project.id,
          projectname: appointment.project.name,
          phone: appointment.phone,
          date: appointment.visitDate,
          time: appointment.visitTime,
          status: appointment.status,
          id: appointment.uuid,
          delete: appointment.isDeleted,
          flstatus: appointment.status,
          dataCriacao: this.formatDate(appointment.createdAt)
        }));
        this.allAppointments = [...this.appointments];
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    );
  }

  Filter() {
    if (this.searchTerm.trim().toLowerCase() === '') {
      this.appointments = [...this.allAppointments];
    } else {
      this.appointments = this.allAppointments.filter(appointment =>
        appointment.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.project.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addNewAppointment(appointment: any) {
    if (!this.selectedAppointment) {
      this.agendamentoService.createAppointment(appointment).subscribe(
        (_) => {
          this.getAppointments();
          this.closeModal();
        },
        (error) => {
          console.error('Erro ao criar o agendamento:', error);
        }
      );
    } else {
      this.agendamentoService.editAgendamento(appointment, this.selectedAppointment.id).subscribe(
        (_) => {
          this.getAppointments();
          this.closeModal();
        },
        (error) => {
          console.error('Erro ao editar o agendamento:', error);
        }
      );
    }
    this.selectedAppointment = null
  }

  checkStatus(appointment: any) {
    if (appointment.flstatus && !appointment.delete) {
      return 'Concluido';
    } if (!appointment.flstatus && appointment.delete) {
      return 'Cancelado';
    }
    return 'Pendente';
  }

  flVisivelConfirmar(appointment: any) {
    if (!appointment.flstatus && !appointment.delete) {
      return true;
    }
    return false
  }

  flVisivelEditar(appointment: any) {
    if (!appointment.flstatus && !appointment.delete) {
      return true;
    }
    return false
  }

  flVisivelCancelar(appointment: any) {
    if (appointment.flstatus && !appointment.delete) {
      return false;
    }
    if (appointment.delete) {
      return false;
    }
    return true
  }

  showMenu(appointment: any) {
    if (appointment.flstatus && !appointment.delete) {
      return false;
    }
    if (appointment.delete) {
      return false;
    }
    return true
  }

  editAppointment(appointment: any, index: number) {
    this.selectedAppointment = appointment;
    this.isModalOpen = true;
  }

  confirmar(appointment: any, index: number) {
    this.agendamentoService.confirmar(appointment.id).subscribe(
      (_) => {
        this.getAppointments();
      },
      (error) => {
        console.error('Erro ao criar o agendamento:', error);
      }
    );
  }

  cancelar(appointment: any, index: number) {
    this.agendamentoService.cancelar(appointment.id).subscribe(
      (_) => {
        this.getAppointments();
      },
      (error) => {
        console.error('Erro ao criar o agendamento:', error);
      }
    );
  }

  formatDateName(date: string): string | null {
    return this.datePipe.transform(date, 'dd MMMM yyyy');
  }

  formatDate(dateString: string): string | null {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || null;
  }

  formatPhone(phone: string): string {
    if (!phone) {
      return '';
    }

    const formattedPhone = phone.replace(/^(\d{3})(\d{3})(\d{3})$/, '+244 $1 $2 $3');
    return formattedPhone;
  }

  toggleDropdown(index: number) {
    const dropdown = document.getElementById(`dropdown-${index}`);
    if (dropdown) dropdown.classList.toggle('hidden');
  }
}
