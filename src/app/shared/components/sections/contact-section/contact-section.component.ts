import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileService, SocialLink} from "../../../../services/profile.service";
import {IconUtil} from "../../../util/icon-util";
import {ContactForm, ContactModalComponent} from "../../contact-modal/contact-modal.component";

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ContactModalComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent implements OnInit {
  protected readonly IconUtil = IconUtil;

  isContactModalOpen = false;

  socialLinks: SocialLink [] = [];

  constructor(private profileService: ProfileService) {}
  ngOnInit(): void {
    this.profileService.getSocialLinks().subscribe(links => {
      this.socialLinks = links;
    });
  }
  
  openModal() {
    this.isContactModalOpen = true
  }

  handleContactFormSubmit(formData: ContactForm) {
    console.log('Form submitted:', formData);
    // Here you could add API call to submit the form data
    alert('Your message has been sent! We will get back to you soon.');
  }

  closeContactModal() {
    this.isContactModalOpen = false;
  }
}
