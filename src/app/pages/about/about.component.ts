import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  experience = [
    {
      company: 'Tech Company',
      position: 'Senior Full-Stack Developer',
      period: '2020 - Present',
      description: 'Leading development of enterprise-level applications using Angular and Node.js. Mentoring junior developers and implementing best practices.'
    },
    {
      company: 'Startup',
      position: 'Full-Stack Developer',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality solutions.'
    }
  ];

  education = [
    {
      institution: 'University Name',
      degree: 'Bachelor of Science in Computer Science',
      period: '2014 - 2018',
      description: 'Graduated with honors. Focused on software engineering and web development.'
    }
  ];

  certifications = [
    {
      name: 'Angular Advanced Developer',
      issuer: 'Angular University',
      date: '2022'
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2021'
    }
  ];
}
