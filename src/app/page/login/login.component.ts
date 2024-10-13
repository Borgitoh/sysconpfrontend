import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';  // Declare a propriedade
  password: string = '';  // Declare a propriedade

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Lógica de autenticação aqui
  }
}
