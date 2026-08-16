import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  demoUrl: string;
  category: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with product management, shopping cart, and payment integration.",
      image: "assets/images/projects/ecommerce.jpg",
      technologies: ["Angular", "Node.js", "Express", "MongoDB"],
      link: "https://github.com/johndoe/ecommerce-platform",
      demoUrl: "https://ecommerce-demo.johndoe.com",
      category: "Web"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team workflow features.",
      image: "assets/images/projects/taskmanager.jpg",
      technologies: ["React", "Firebase", "Material UI", "Redux"],
      link: "https://github.com/johndoe/task-manager",
      demoUrl: "https://task-manager-demo.johndoe.com",
      category: "Web"
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description: "Mobile application to track workouts, nutrition, and fitness progress with analytics dashboard.",
      image: "assets/images/projects/fitness.jpg",
      technologies: ["React Native", "Redux", "Express", "MongoDB"],
      link: "https://github.com/johndoe/fitness-tracker",
      demoUrl: "https://fitness-demo.johndoe.com",
      category: "Mobile"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather forecasting application with interactive maps and alerts system.",
      image: "assets/images/projects/weather.jpg",
      technologies: ["JavaScript", "OpenWeatherAPI", "Chart.js", "Leaflet"],
      link: "https://github.com/johndoe/weather-dashboard",
      demoUrl: "https://weather.johndoe.com",
      category: "Web"
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with a modern, responsive design.",
      image: "assets/images/projects/portfolio.jpg",
      technologies: ["Angular", "TypeScript", "TailwindCSS"],
      link: "https://github.com/johndoe/portfolio",
      demoUrl: "https://johndoe.com",
      category: "Web"
    },
    {
      id: 6,
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking system for small businesses with barcode scanning and reporting.",
      image: "assets/images/projects/inventory.jpg",
      technologies: ["Angular", "Node.js", "PostgreSQL", "Docker"],
      link: "https://github.com/johndoe/inventory-system",
      demoUrl: "https://inventory-demo.johndoe.com",
      category: "Web"
    }
  ];

  categories = ['All', 'Angular', 'React', 'Node.js', 'Full Stack'];
  selectedCategory = 'All';

  filterProjects(category: string) {
    this.selectedCategory = category;
  }

  get filteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(project => 
      project.technologies.some(tech => tech.toLowerCase() === this.selectedCategory.toLowerCase())
    );
  }
}
