import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    const agora = new Date();
    const targetDate = new Date(value);
    const diffInSeconds = Math.floor((agora.getTime() - targetDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return minutes === 1 ? '1 minuto atrás' : `${minutes} minutos atrás`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return hours === 1 ? '1 hora atrás' : `${hours} horas atrás`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return days === 1 ? '1 dia atrás' : `${days} dias atrás`;
    }
  }

}
