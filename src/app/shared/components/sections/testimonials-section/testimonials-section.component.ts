import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Testimonial } from '../../testimonial-modal/testimonial-modal.component';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss'
})
export class TestimonialsSectionComponent {
  @Input() featuredTestimonials: Testimonial[] = [];
  @Output() openModal = new EventEmitter<void>();
  
  openTestimonialModal() {
    this.openModal.emit();
  }
}
