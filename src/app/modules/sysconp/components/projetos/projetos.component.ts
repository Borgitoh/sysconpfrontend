import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Projects } from '../../enums/module.data';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent {
  isCreateModalOpen = false;
  searchControl = new FormControl('');
  filteredProjects = Projects;
  dropdownOpenIndex : number | null = null;

  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredProjects = Projects.filter(project =>
        project.name.toLowerCase().includes(value?.toLowerCase())
      );
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
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
