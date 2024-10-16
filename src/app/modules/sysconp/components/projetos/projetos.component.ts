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

  constructor(private projectoService: ProjectoService) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredProjects = Projects.filter(project =>
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
    this.projectoService.addItemProjecto(projeto).subscribe(
      (_: any) => {
          this.closeCreateModal();
      },
      (error) => {
        console.error('Erro ao usaurio:', error);
      }
    );
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

  onEdit() {
    this.dropdownOpenIndex = null;
  }

  onDelete() {
    this.dropdownOpenIndex = null;
  }

}
