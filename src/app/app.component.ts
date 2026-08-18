import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet, RouterLink, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContactModalComponent } from './shared/components/contact-modal/contact-modal.component';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HeroSectionComponent} from "./shared/components/sections/hero-section/hero-section.component";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FooterComponent, HeroSectionComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'John Doe - Full-Stack Developer | Portfolio';
  isMenuOpen = false;
  isDarkMode = false;
  currentRoute = '';
  showHero = true;
  // isContactModalOpen = false;

  private readonly isBrowser: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Check if dark mode preference exists in localStorage
      const storedDarkMode = localStorage.getItem('darkMode');
      if (storedDarkMode) {
        this.isDarkMode = storedDarkMode === 'true';
        this.applyDarkMode();
      } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
          this.enableDarkMode();
        }
      }
    }

    // Subscribe to router events to update current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      // Close mobile menu when navigating
      this.isMenuOpen = false;
      
      // Get the current route data
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      
      route.data.subscribe(data => {
        // Use route data to determine if hero should be shown
        this.showHero = data['showHero'] === true;
      });
      
      // Scroll to top if navigating to a different page
      if (this.isBrowser && (!this.isHomePage() || this.currentRoute !== '/')) {
        window.scrollTo(0, 0);
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  private enableDarkMode() {
    this.isDarkMode = true;
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }

  // private disableDarkMode() {
  //   this.isDarkMode = false;
  //   document.documentElement.classList.remove('dark');
  //   localStorage.setItem('darkMode', 'false');
  // }

  private applyDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  isHomePage(): boolean {
    return this.currentRoute === '/' || this.currentRoute === '' || this.currentRoute === '/home';
  }


  scrollToSection(sectionId: string) {
    this.isMenuOpen = false; // Close mobile menu when clicking a nav item
    
    if (!this.isHomePage()) {
      // Navigate to home page first, then scroll to section
      this.router.navigate(['/'])
        .then(() => {
          setTimeout(() => {
            this.scrollToElement(sectionId);
          }, 300); // Increased timeout to ensure rendering is complete
        });
    } else {
      this.scrollToElement(sectionId);
    }
  }

  private scrollToElement(sectionId: string) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}
