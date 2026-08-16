import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../pages/home/home.component';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" (click)="close()"></div>
      
      <!-- Modal panel -->
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-start justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white" id="modal-title">
                All Projects
              </h3>
              <button 
                type="button" 
                class="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                (click)="close()"
              >
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Filter options -->
            <div class="flex flex-wrap gap-2 mt-4 mb-6">
              <button 
                (click)="filterProjects('all')" 
                [class.bg-blue-600]="currentFilter === 'all'"
                [class.text-white]="currentFilter === 'all'"
                [class.bg-gray-200]="currentFilter !== 'all'"
                [class.dark:bg-gray-700]="currentFilter !== 'all'"
                [class.text-gray-800]="currentFilter !== 'all'"
                [class.dark:text-gray-300]="currentFilter !== 'all'"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                All
              </button>
              <button 
                (click)="filterProjects('Web')" 
                [class.bg-blue-600]="currentFilter === 'Web'"
                [class.text-white]="currentFilter === 'Web'"
                [class.bg-gray-200]="currentFilter !== 'Web'"
                [class.dark:bg-gray-700]="currentFilter !== 'Web'"
                [class.text-gray-800]="currentFilter !== 'Web'"
                [class.dark:text-gray-300]="currentFilter !== 'Web'"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                Web
              </button>
              <button 
                (click)="filterProjects('Mobile')" 
                [class.bg-blue-600]="currentFilter === 'Mobile'"
                [class.text-white]="currentFilter === 'Mobile'"
                [class.bg-gray-200]="currentFilter !== 'Mobile'"
                [class.dark:bg-gray-700]="currentFilter !== 'Mobile'"
                [class.text-gray-800]="currentFilter !== 'Mobile'"
                [class.dark:text-gray-300]="currentFilter !== 'Mobile'"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                Mobile
              </button>
            </div>
            
            <!-- Projects grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
              <div *ngFor="let project of filteredProjects" class="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary dark:hover:border-secondary transform hover:scale-103">
                <img [src]="project.image" [alt]="project.title" class="w-full h-48 object-cover">
                <div class="p-4">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{ project.description }}</p>
                  
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span *ngFor="let tech of project.technologies" class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded">
                      {{ tech }}
                    </span>
                  </div>
                  
                  <div class="flex gap-4">
                    <a *ngIf="project.demoUrl" [href]="project.demoUrl" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a *ngIf="project.link"  [href]="project.link" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 mr-1 fill-current">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
              type="button"
              (click)="close()" 
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ProjectModalComponent {
  @Input() isOpen = false;
  @Input() projects: Project[] = [];
  @Output() closeModal = new EventEmitter<void>();
  
  currentFilter = 'all';
  
  get filteredProjects(): Project[] {
    if (this.currentFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.currentFilter);
  }
  
  filterProjects(category: string) {
    this.currentFilter = category;
  }
  
  close() {
    this.closeModal.emit();
  }
} 