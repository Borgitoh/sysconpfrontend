import { Component } from '@angular/core';
import { AgendamentoService } from '../../service/agendamento.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: any = '';
  agendamento = {
    createdAt: '2024-10-18T:00:00Z',
  };
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private agendamentoService: AgendamentoService,
              private authService: AuthService,
              private datePipe: DatePipe,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.user = JSON.parse(localStorage.getItem('user') ?? '{}')

    this.router.events.subscribe(() => {
                  this.createBreadcrumbs(this.activatedRoute.root);
    });


  }

  ngOnInit() {
    this.getAppointments();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  showNotification(){
    this.showNotifications= !this.showNotifications
  }

  hasPermission(...permissions: string[]): boolean {
    if (!this.user || !this.user.permission) {
      return false;
    }

    return permissions.some(permission =>
      this.user.permission.some((userPerm:any) => userPerm.code === permission)
    );
  }


  showUserMen(){
    this.showUserMenu = !this.showUserMenu
  }

  sair(){
    this.authService.logout()
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

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): void {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.breadcrumbs = breadcrumbs;
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: routeURL, url: url });
      this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
