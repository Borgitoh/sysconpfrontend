import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnderecoService } from '../../../service/endereco.service';

@Component({
  selector: 'app-projeto-modal',
  templateUrl: './projeto-modal.component.html',
  styleUrls: ['./projeto-modal.component.scss']
})
export class ProjetoModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() addProjeto = new EventEmitter<any>();
  @Input() selectedProjecto: any;

  projectForm: FormGroup;
  provincias: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];
  bairros: any[] = [];

  onClose() {
    this.close.emit();
  }

  constructor(private fb: FormBuilder,
              private enderecoService: EnderecoService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      distrito: ['', Validators.required],
      bairro: ['', Validators.required],
      morada: ['', ],
    });

    this.getProvincias();

    this.projectForm.get('provincia')?.valueChanges.subscribe(value => {
      if (value) {
        this.getMunicipios();
        this.projectForm.controls['municipio'].setValue('');
        this.projectForm.controls['distrito'].setValue('');
        this.projectForm.controls['bairro'].setValue('');
      }
    });

    this.projectForm.get('municipio')?.valueChanges.subscribe(value => {
      if (value) {
        this.getDistritos();
        this.projectForm.controls['distrito'].setValue('');
        this.projectForm.controls['bairro'].setValue('');
      }
    });
    this.projectForm.get('distrito')?.valueChanges.subscribe(value => {
      if (value) {
        this.getBairros();
        this.projectForm.controls['bairro'].setValue('');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProjecto) {
      this.projectForm.patchValue(this.selectedProjecto);
    }
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
    this.enderecoService.getMunicipios(this.projectForm.controls['provincia'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.municipios = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  getDistritos(){

    this.enderecoService.getDistritos(this.projectForm.controls['municipio'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.distritos = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  getBairros(){
    this.enderecoService.getBairros(this.projectForm.controls['distrito'].value.split(';')[0]).subscribe(
      (data: any) => {
        this.bairros = data.lista
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.addProjeto.emit(this.projectForm.value)
      this.projectForm.reset();
    } else {
      this.projectForm.markAllAsTouched();
    }
  }
}
