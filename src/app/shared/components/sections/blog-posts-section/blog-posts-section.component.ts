import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogPost, BlogPostService} from "../../../../services/blog-post.service";

// export interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   image: string;
//   date: string;
//   readTime: string;
//   category: string;
//   link: string;
// }

@Component({
  selector: 'app-blog-posts-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-posts-section.component.html',
  styleUrl: './blog-posts-section.component.scss'
})
export class BlogPostsSectionComponent implements OnInit {

  // recentPosts: BlogPost[] = [
  //   {
  //     id: 1,
  //     title: "Building Scalable Web Applications with Angular",
  //     excerpt: "Learn the best practices and patterns for creating scalable Angular applications that can grow with your business needs.",
  //     image: "assets/images/blog/angular-scalable.jpg",
  //     date: "March 15, 2024",
  //     readTime: "8 min read",
  //     category: "Web Development",
  //     link: "/blog/building-scalable-web-applications"
  //   },
  //   {
  //     id: 2,
  //     title: "The Future of Frontend Development",
  //     excerpt: "Explore the latest trends and technologies shaping the future of frontend development, from Web Components to AI-powered tools.",
  //     image: "assets/images/blog/frontend-future.jpg",
  //     date: "March 10, 2024",
  //     readTime: "6 min read",
  //     category: "Technology",
  //     link: "/blog/future-of-frontend"
  //   },
  //   {
  //     id: 3,
  //     title: "Optimizing Performance in Modern Web Apps",
  //     excerpt: "Discover techniques and strategies for optimizing the performance of your web applications, from code splitting to lazy loading.",
  //     image: "assets/images/blog/performance-optimization.jpg",
  //     date: "March 5, 2024",
  //     readTime: "7 min read",
  //     category: "Performance",
  //     link: "/blog/optimizing-web-performance"
  //   }
  // ];

  recentPosts: BlogPost[] = [];
  constructor(private blogPostService: BlogPostService) {
  }

  ngOnInit(): void {
    this.blogPostService.getRecentPosts().subscribe(posts => {
      this.recentPosts = posts;
    });
  }
} 