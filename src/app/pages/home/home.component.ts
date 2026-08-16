import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from '../../shared/components/project-modal/project-modal.component';
import { TestimonialModalComponent } from '../../shared/components/testimonial-modal/testimonial-modal.component';
import { AboutSectionComponent } from '../../shared/components/sections/about-section/about-section.component';
import { WhatIDoSectionComponent } from '../../shared/components/sections/what-i-do-section/what-i-do-section.component';
import { FeaturedProjectsSectionComponent } from '../../shared/components/sections/featured-projects-section/featured-projects-section.component';
import { SkillsSectionComponent } from '../../shared/components/sections/skills-section/skills-section.component';
import { TestimonialsSectionComponent } from '../../shared/components/sections/testimonials-section/testimonials-section.component';
import { ExperienceSectionComponent } from '../../shared/components/sections/experience-section/experience-section.component';
import { EducationSectionComponent } from '../../shared/components/sections/education-section/education-section.component';
import { LanguagesSectionComponent } from '../../shared/components/sections/languages-section/languages-section.component';
import { ContactSectionComponent } from '../../shared/components/sections/contact-section/contact-section.component';
import { BlogPostsSectionComponent } from '../../shared/components/sections/blog-posts-section/blog-posts-section.component';

export interface Project {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  demoUrl?: string;
  category: string;
}

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
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ProjectModalComponent, 
    TestimonialModalComponent,
    AboutSectionComponent,
    WhatIDoSectionComponent,
    FeaturedProjectsSectionComponent,
    SkillsSectionComponent,
    TestimonialsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
    BlogPostsSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isProjectModalOpen = false;
  isTestimonialModalOpen = false;
  isContactModalOpen = false;
  
  recentProjects: Project[] = [
    {
      id: 1,
      title: "Task Management Platform",
      description: "Team task board with drag-and-drop scheduling, role-based permissions, and real-time updates over WebSockets.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["Angular", "TypeScript", "TailwindCSS"],
      demoUrl: "https://example.com/demo/tasks",
      category: "Web"
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Reporting dashboard that aggregates data from several sources and renders charts, filters, and scheduled exports.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["React", "Node.js", "PostgreSQL"],
      link: "https://github.com/johndoe/analytics-dashboard",
      category: "Web"
    },
    {
      id: 3,
      title: "URL Shortener Service",
      description: "Link shortening API with custom slugs, click analytics, rate limiting, and OpenAPI-documented endpoints.",
      image: "assets/images/projects/placeholder-backend.svg",
      technologies: ["Spring Boot", "Java", "MongoDB", "Docker"],
      link: "https://github.com/johndoe/url-shortener",
      category: "Backend"
    },
    {
      id: 4,
      title: "Point of Sale System",
      description: "Full-stack point of sale for managing customers, inventory, and orders, with an Angular front end and a REST API.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["Angular", "Spring Boot", "Java", "Hibernate"],
      link: "https://github.com/johndoe/pos-system",
      category: "Web"
    },
    {
      id: 5,
      title: "Company Landing Page",
      description: "Responsive marketing site with a content-managed services section and a contact form wired to a mail service.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      demoUrl: "https://example.com/demo/landing",
      category: "Web"
    },
    {
      id: 6,
      title: "Personal Portfolio",
      description: "This template: a responsive portfolio with dark mode, filterable projects, and sections driven by typed data.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["Angular", "TypeScript", "TailwindCSS"],
      link: "https://github.com/johndoe/dev-portfolio-angular",
      category: "Web"
    },
  ];

  allProjects: Project[] = [
    ...this.recentProjects,
    {
      id: 7,
      title: "News Aggregator",
      description: "Content aggregation service with scheduled ingestion, deduplication, and a search index over collected articles.",
      image: "assets/images/projects/placeholder-backend.svg",
      technologies: ["Spring Boot", "MongoDB", "Redis"],
      category: "Web"
    },
    {
      id: 8,
      title: "Media Saver Mobile App",
      description: "Cross-platform app for browsing and saving media to the device gallery, built from a single codebase.",
      image: "assets/images/projects/placeholder-mobile.svg",
      technologies: ["Flutter", "Dart"],
      category: "Mobile"
    },
    {
      id: 9,
      title: "Icon Finder Tool",
      description: "Lightweight browser tool that fetches and downloads site icons in several sizes from public icon APIs.",
      image: "assets/images/projects/placeholder-web.svg",
      link: "https://github.com/johndoe/icon-finder",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      category: "Web"
    },
    {
      id: 10,
      title: "Cover Image Generator",
      description: "Desktop application that generates cover images in bulk from a set of templates and input combinations.",
      image: "assets/images/projects/placeholder-desktop.svg",
      technologies: ["Java", "JavaFX"],
      link: "https://github.com/johndoe/cover-generator",
      category: "Desktop"
    },
    {
      id: 11,
      title: "Document Batch Checker",
      description: "Tool that batch-checks documents against a set of rules by driving a browser workflow automatically.",
      image: "assets/images/projects/placeholder-automation.svg",
      technologies: ["Java", "Selenium", "Maven"],
      link: "https://github.com/johndoe/batch-checker",
      category: "Automation"
    },
    {
      id: 12,
      title: "Product Data Scraper",
      description: "Scraper that extracts product details in bulk from listing pages and exports them as structured data.",
      image: "assets/images/projects/placeholder-automation.svg",
      technologies: ["Python", "Web Scraping"],
      link: "https://github.com/johndoe/product-scraper",
      category: "Automation"
    },
    {
      id: 13,
      title: "CMS Comment Cleaner",
      description: "Script that fetches and cleans up pending comments in bulk through a content management system's REST API.",
      image: "assets/images/projects/placeholder-automation.svg",
      technologies: ["Python", "REST API"],
      link: "https://github.com/johndoe/comment-cleaner",
      category: "Automation"
    },
    {
      id: 14,
      title: "Blog Platform",
      description: "Full-stack blog with an Angular front end and a REST back end using an ORM and a relational database.",
      image: "assets/images/projects/placeholder-web.svg",
      technologies: ["Angular", "Spring", "Hibernate", "MySQL"],
      link: "https://github.com/johndoe/blog-platform",
      category: "Web"
    },
  ];

  allTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Morgan",
      company: "Client - United States",
      text: "Delivered exactly what we needed, ahead of schedule and with clear communication throughout. Would hire again without hesitation.",
      rating: 5,
      featured: true,
    },
    {
      id: 2,
      name: "Priya Raman",
      company: "Client - United Kingdom",
      text: "Took a vague brief and turned it into a working product. Asked the right questions early, which saved us weeks later on.",
      rating: 5,
      featured: true,
    },
    {
      id: 3,
      name: "Daniel Fischer",
      company: "Client - Germany",
      text: "Excellent technical judgement. Flagged two problems in our original spec that would have been expensive to discover in production.",
      rating: 5,
      featured: true,
    },
    {
      id: 4,
      name: "Sofia Ricci",
      company: "Client - Italy",
      text: "Fast, reliable, and easy to work with. The handover documentation was better than what we get from most agencies.",
      rating: 5,
    },
    {
      id: 5,
      name: "Marcus Chen",
      company: "Client - Singapore",
      text: "Rebuilt a slow reporting page and cut load time from nine seconds to under one. Measurable difference for our team.",
      rating: 5,
    },
    {
      id: 6,
      name: "Amara Okafor",
      company: "Client - Canada",
      text: "Great communication across time zones. Sent daily updates without being asked, which made planning straightforward.",
      rating: 5,
    },
    {
      id: 7,
      name: "Tomas Novak",
      company: "Client - Czech Republic",
      text: "Solid work on a tricky integration. Handled the edge cases we had not thought about.",
      rating: 5,
    },
    {
      id: 8,
      name: "Elena Vasquez",
      company: "Client - Spain",
      text: "Professional throughout. Delivered on scope, on time, and stayed available for questions after launch.",
      rating: 5,
    },
    {
      id: 9,
      name: "James Whitfield",
      company: "Client - Australia",
      text: "Clean, readable code that our own team could pick up immediately. That is rarer than it should be.",
      rating: 5,
    },
    {
      id: 10,
      name: "Yuki Tanaka",
      company: "Client - Japan",
      text: "Very thorough. Wrote tests for the parts that mattered and explained the trade-offs where he skipped them.",
      rating: 5,
    },
  ];

  featuredTestimonials: Testimonial[] = this.allTestimonials.filter(testimonial => testimonial.featured);


  openProjectModal() {
    this.isProjectModalOpen = true;
  }
  
  closeProjectModal() {
    this.isProjectModalOpen = false;
  }
  
  openTestimonialModal() {
    this.isTestimonialModalOpen = true;
  }
  
  closeTestimonialModal() {
    this.isTestimonialModalOpen = false;
  }
  
  openContactModal() {
    this.isContactModalOpen = true;
  }
}
