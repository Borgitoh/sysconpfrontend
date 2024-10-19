import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/modules/sysconp/service/usuario.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent {
  userForm: FormGroup;
  showPassword: boolean = false;
  passwordsMatch: boolean = true;
  id =22

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRouteSnapshot : ActivatedRoute) {

    this.userForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.userForm.valueChanges.subscribe(() => {
      console.log(this.userForm);

      this.passwordsMatch = this.userForm.get('newPassword')?.value === this.userForm.get('confirmPassword')?.value;
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.userForm.valid && this.passwordsMatch) {
      this.usuarioService.editSenha(this.userForm.value,this.activatedRouteSnapshot.snapshot.paramMap.get('id')).subscribe({
        next: (_:any) => {
          this.router.navigate(['/login']);
        },
        error: (error:any) => {
          console.error('Erro ao fazer login:', error);
        },
      });
    }
    this.userForm.reset();
  }
}
