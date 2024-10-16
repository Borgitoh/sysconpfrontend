import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent {
  @Output() addUsuario = new EventEmitter<any>();
  userForm: FormGroup;
  showPassword: boolean = false;
  passwordsMatch: boolean = true;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      code:['', Validators.required]
    });

    this.userForm.valueChanges.subscribe(() => {
      this.passwordsMatch = this.userForm.get('password')?.value === this.userForm.get('confirmPassword')?.value;
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getInitials(nome: string): string {
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

  onSubmit(): void {
    if (this.userForm.valid && this.passwordsMatch) {
      this.addUsuario.emit(this.userForm.value)
    }
    this.userForm.reset();
  }
}
