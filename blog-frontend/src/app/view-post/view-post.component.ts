import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BlogServiceService, Post } from '../blog-service.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="view-post-container">
      <div class="post-header">
        <a routerLink="/posts" class="back-link">&larr; Back to Posts</a>
        <h1>{{ post?.name }}</h1>
        <div class="post-meta">
          <span class="author">By {{ post?.postedBy }}</span>
          <span class="date">{{ post?.date | date }}</span>
        </div>
      </div>

      <div class="post-content">
        <img *ngIf="post?.img" [src]="post?.img" [alt]="post?.name" class="post-image">
        <p>{{ post?.content }}</p>
      </div>

      <div class="post-footer">
        <div class="tags" *ngIf="post?.tags?.length">
          <span class="tag" *ngFor="let tag of post?.tags">{{ tag }}</span>
        </div>
        <div class="likes">
          <button class="btn btn-primary" (click)="likePost()">
            ❤️ {{ post?.likeCount || 0 }} Likes
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .view-post-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 2rem;
      color: var(--text-light);
      text-decoration: none;
    }

    .back-link:hover {
      color: var(--primary-color);
    }

    .post-header {
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .post-meta {
      color: var(--text-light);
      font-size: 0.9rem;
    }

    .post-meta span {
      margin-right: 1rem;
    }

    .post-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
    }

    .post-content {
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border-color);
    }

    .tags {
      display: flex;
      gap: 0.5rem;
    }

    .tag {
      background: var(--background-color);
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.9rem;
    }
  `]
})
export class ViewPostComponent implements OnInit {
  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blogService.getPost(id).subscribe({
        next: (post: Post) => {
          this.post = post;
        },
        error: (error: Error) => {
          console.error('Error fetching post:', error);
        }
      });
    });
  }

  likePost() {
    if (this.post && this.post.id) {
      this.post.likeCount = (this.post.likeCount || 0) + 1;
      this.blogService.updatePost(this.post).subscribe({
        error: (error: Error) => {
          console.error('Error updating likes:', error);
        }
      });
    }
  }
}
