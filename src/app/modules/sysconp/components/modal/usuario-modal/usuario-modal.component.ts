import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../../service/endereco.service';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent {
  @Output() addUsuario = new EventEmitter<any>();
  @Input() selectedUsuario: any;
  userForm: FormGroup;
  showPassword: boolean = false;
  passwordsMatch: boolean = true;
  provincias: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];
  bairros: any[] = [];

  constructor(private fb: FormBuilder,
              private enderecoService: EnderecoService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      code:['', Validators.required],
      provincia: ['',],
      municipio: ['', ],
      distrito: ['', ],
      bairro: ['', ],
      morada: ['', ]
    });

    this.userForm.valueChanges.subscribe(() => {
      this.passwordsMatch = this.userForm.get('password')?.value === this.userForm.get('confirmPassword')?.value;
    });

    this.getProvincias();

    this.userForm.get('provincia')?.valueChanges.subscribe(value => {
      if (value) {
        this.getMunicipios();
        this.userForm.controls['municipio'].setValue('');
        this.userForm.controls['distrito'].setValue('');
        this.userForm.controls['bairro'].setValue('');
      }
    });

    this.userForm.get('municipio')?.valueChanges.subscribe(value => {
      if (value) {
        this.getDistritos();
        this.userForm.controls['distrito'].setValue('');
        this.userForm.controls['bairro'].setValue('');
      }
    });

    this.userForm.get('distrito')?.valueChanges.subscribe(value => {
      if (value) {
        this.getBairros();
        this.userForm.controls['bairro'].setValue('');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedUsuario) {
      this.userForm.patchValue(this.selectedUsuario);
    }
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


  getProvincias(){
    this.enderecoService.getProvincias().subscribe(
      (data: any) => {
        this.provincias = data.lista

      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  getMunicipios(){
    this.enderecoService.getMunicipios(this.userForm.controls['provincia'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.municipios = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  getDistritos(){

    this.enderecoService.getDistritos(this.userForm.controls['municipio'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.distritos = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  getBairros(){
    this.enderecoService.getBairros(this.userForm.controls['distrito'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.bairros = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid && this.passwordsMatch) {
      this.addUsuario.emit(this.userForm.value)
    }
    this.userForm.reset();
  }
}
