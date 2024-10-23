import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Projects } from '../../enums/module.data';
import { ProjectoService } from '../../service/projecto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {
  isCreateModalOpen = false;
  searchControl = new FormControl('');
  filteredProjects: any[] = [];
  dropdownOpenIndex : number | null = null;
  selectedProjecto: any = null;

  constructor(private projectoService: ProjectoService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredProjects = this.filteredProjects.filter(project =>
        project.name.toLowerCase().includes(value?.toLowerCase())
      );
    });
  }

  ngOnInit() {
    this.getProjetos();
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  addProjeto(projeto:any){
    if(this.selectedProjecto){
      this.projectoService.addItemProjecto(projeto).subscribe(
        (_: any) => {
          this.getProjetos()
            this.closeCreateModal();
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
    }else{
      this.projectoService.addItemProjecto(projeto).subscribe(
        (_: any) => {
          this.getProjetos();
            this.closeCreateModal();
        },
        (error) => {
          console.error('Erro ao projecto:', error);
        }
      );
    }

  }

  getProjetos(){
    this.projectoService.getProjectos().subscribe(
      (data: any) => {
        this.filteredProjects = data
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  toggleDropdown(index: number) {
    this.dropdownOpenIndex = this.dropdownOpenIndex === index ? null : index;
  }

  onEdit(projecto:any) {
    this.dropdownOpenIndex = null;
    this.selectedProjecto =projecto
    this.isCreateModalOpen = true;
  }

  onDelete() {
    this.dropdownOpenIndex = null;
  }

}
