import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProfileService, SocialLink} from "../../../../services/profile.service";
import {IconUtil} from "../../../util/icon-util";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  protected readonly IconUtil = IconUtil;
  @Input() showHero: boolean = true;
  @Input() scrollToSection!: (sectionId: string) => void;
  // @Input() scrollToSection!: (sectionId: string) => void;
  socialLinks: SocialLink [] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getSocialLinks().subscribe(links => {
      this.socialLinks = links;
    });
  }
}