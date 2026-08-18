import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Testimonial } from '../../testimonial-modal/testimonial-modal.component';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [NgOptimizedImage],
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
