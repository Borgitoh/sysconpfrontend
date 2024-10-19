import { Component } from '@angular/core';
import { AgendamentoService } from '../../service/agendamento.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  bgImage = 'assets/img/fundo.png';
  sidebarOpen = false;
  showNotifications = false;
  showUserMenu = false;
  recentAgendamento:any [] = [];
  agendamentosAmanha :any [] = [];
  datahoramanha: any = '';

  constructor(private agendamentoService: AgendamentoService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAppointments();
  }

  agendamento = {
    createdAt: '2024-10-18T:00:00Z',
  };

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  showNotification(){
    this.showNotifications= !this.showNotifications
  }
  showUserMen(){
    this.showUserMenu = !this.showUserMenu
  }

  getAppointments() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    const dado ={
      date:  "2024-10-16"
    }

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

        this.agendamentosAmanha = data
        .filter(appointment =>  appointment.visitDate == tomorrowFormatted)
        this.datahoramanha =  this.agendamentosAmanha[0].createdAt
      },
      (error) => {
        console.error('Erro ao buscar agendamentos:', error);
      }
    );
  }

  formatDate(dateString: string): string | null {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-mm-dd') || null;
  }

}
