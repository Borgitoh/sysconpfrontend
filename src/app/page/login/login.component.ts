import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/sysconp/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  loginForm: FormGroup;
  flLogin = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Cria o FormGroup usando FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validação para o email
      password: ['', [Validators.required]],                  // Validação para a senha
    });
  }


  login(): void {
    if (this.loginForm.valid) {
     this.flLogin = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (user:any) => {
          console.log('Login bem-sucedido:', user);
          this.router.navigate(['/sysconp']);
        },
        error: (error:any) => {
          console.error('Erro ao fazer login:', error);
        },
      });
    }
  }
}
