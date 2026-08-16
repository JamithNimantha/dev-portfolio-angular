import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../pages/home/home.component';

@Component({
  selector: 'app-featured-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-projects-section.component.html',
  styleUrl: './featured-projects-section.component.scss'
})
export class FeaturedProjectsSectionComponent {
  @Input() recentProjects: Project[] = [];
  @Output() openModal = new EventEmitter<void>();
  
  openProjectModal() {
    this.openModal.emit();
  }
}
