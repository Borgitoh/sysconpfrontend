import { Component } from '@angular/core';
import { AgendamentoService } from '../../service/agendamento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  recentAgendamento:any [] = [];
  totalAgendamento: number = 0 ;
  recentAgendamentoHour: number = 0;
  totalConcluido:number = 0;
  percentConcluido: number = 0;

  constructor(private agendamentoService: AgendamentoService,) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    const agora = new Date();
    const umaHoraAgo =  new Date(agora.getTime() - (30 * 60 * 1000));
    this.agendamentoService.getAppointments().subscribe(
      (data) => {
        this.recentAgendamento = data.map(appointment => ({
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
          dataCriacao: appointment.createdAt
        }));

        this.totalAgendamento = data.length

        this.recentAgendamentoHour = this.recentAgendamento.filter(appointment =>
          new Date(appointment.dataCriacao)  <= umaHoraAgo
        ).length;

        this.totalConcluido = data.filter(appointment =>
          appointment.status && !appointment.isDeleted
        ).length;

        this.percentConcluido = this.totalAgendamento > 0
        ? (this.totalConcluido / this.totalAgendamento) * 100
        : 0;
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    );
  }

  checkStatus(Agendamento: any) {
    if (Agendamento.flstatus && !Agendamento.delete) {
      return 'Concluido';
    } if (!Agendamento.flstatus && Agendamento.delete) {
      return 'Cancelado';
    }
    return 'Pendente';
  }

  getInitials(nome: any) {
    if (!nome) return '';

    const nomeParts = nome.trim().split(' ');

    if (nomeParts.length === 1) {
      return nomeParts[0];
    }

    const firstnome = nomeParts[0];
    const lastnome = nomeParts[nomeParts.length - 1];
    const initials = firstnome[0].toUpperCase() + (lastnome ? lastnome[0].toUpperCase() : '');

    return initials;
  }
}
