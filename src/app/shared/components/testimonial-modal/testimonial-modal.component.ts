import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image?: string;
  text: string;
  rating: number;
  featured?: boolean;
}

@Component({
  selector: 'app-testimonial-modal',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
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
                Client Testimonials
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
            
            <!-- Testimonials grid -->
            <div class="grid grid-cols-1 gap-6 max-h-[70vh] overflow-y-auto py-4 pr-2">
              <div *ngFor="let testimonial of testimonials" class="border border-gray-200 dark:border-gray-700   bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md p-6 transition-all duration-300 group  hover:border-primary dark:hover:border-secondary transform hover:scale-104 hover:shadow-soft-lg">
                <div class="flex items-start mb-4">
                  <div class="h-12 w-12 rounded-full overflow-hidden mr-4 flex items-center justify-center bg-white dark:bg-gray-800">
                    <ng-container *ngIf="testimonial.image && testimonial.image.trim().length > 0; else defaultIcon">
                      <img
                          [ngSrc]="testimonial.image"
                          width="48"
                          height="48"
                          [alt]="testimonial.name"
                          class="h-full w-full object-cover"
                          (error)="testimonial.image = 'assets/icons/default.svg'"
                      />
                    </ng-container>

                    <ng-template #defaultIcon>
                      <i class="fa-regular fa-circle-user text-gray-400 text-2xl"></i>
                    </ng-template>
                  </div>
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">{{ testimonial.company }}</p>
                    <div class="flex mt-1">
                      <ng-container *ngFor="let star of [1, 2, 3, 4, 5]">
                        <svg 
                          [class.text-yellow-400]="star <= testimonial.rating"
                          [class.text-gray-300]="star > testimonial.rating"
                          class="h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </ng-container>
                    </div>
                  </div>
                </div>
                
                <div class="relative">
                  <svg class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200 dark:text-gray-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p class="relative ml-6 text-gray-600 dark:text-gray-300 italic">
                    {{ testimonial.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
              type="button"
              (click)="close()" 
              class="inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:w-auto"
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
export class TestimonialModalComponent {
  @Input() isOpen = false;
  @Input() testimonials: Testimonial[] = [];
  @Output() closeModal = new EventEmitter<void>();
  
  close() {
    this.closeModal.emit();
  }
} 