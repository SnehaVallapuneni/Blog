import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogServiceService, Post } from '../blog-service.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="posts-container">
      <div class="posts-header">
        <h1>All Posts</h1>
        <a routerLink="/create-post" class="btn btn-primary">Create New Post</a>
      </div>

      <div class="posts-grid">
        <div *ngFor="let post of posts" class="post-card">
          <div class="post-image" *ngIf="post.imageUrl">
            <img [src]="post.imageUrl" [alt]="post.title">
          </div>
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-excerpt">{{ post.content | slice:0:150 }}{{ post.content.length > 150 ? '...' : '' }}</p>
            <div class="post-meta">
              <span class="author">By {{ post.author }}</span>
              <span class="date">{{ post.createdAt | date }}</span>
            </div>
            <div class="post-tags" *ngIf="post.tags?.length">
              <span class="tag" *ngFor="let tag of post.tags">{{ tag }}</span>
            </div>
            <a [routerLink]="['/view-post', post.id]" class="read-more">Read More</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .posts-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .posts-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      color: var(--primary-color);
      margin: 0;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .post-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .post-card:hover {
      transform: translateY(-5px);
    }

    .post-image {
      height: 200px;
      overflow: hidden;
    }

    .post-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .post-content {
      padding: 1.5rem;
    }

    .post-title {
      font-size: 1.25rem;
      color: var(--primary-color);
      margin: 0 0 1rem 0;
    }

    .post-excerpt {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .post-meta {
      display: flex;
      justify-content: space-between;
      color: #888;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      background: #f0f2f5;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      color: #666;
    }

    .read-more {
      display: inline-block;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }

    .read-more:hover {
      text-decoration: underline;
    }

    .btn {
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-primary {
      background-color: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background-color: #2980b9;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .posts-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .posts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private blogService: BlogServiceService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        console.log('Posts loaded:', posts);
      },
      error: (error: Error) => {
        console.error('Error loading posts:', error);
      }
    });
  }
} 