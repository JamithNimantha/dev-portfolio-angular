import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { Project } from '../../../../pages/home/home.component';

@Component({
  selector: 'app-featured-projects-section',
  standalone: true,
  imports: [],
  templateUrl: './featured-projects-section.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './featured-projects-section.component.scss'
})
export class FeaturedProjectsSectionComponent {
  @Input() recentProjects: Project[] = [];
  @Output() openModal = new EventEmitter<void>();
  
  openProjectModal() {
    this.openModal.emit();
  }
}
