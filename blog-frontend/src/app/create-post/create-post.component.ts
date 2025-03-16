import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { BlogServiceService, Post } from '../blog-service.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="create-post-page">
      <div class="create-post-container">
        <h2 class="page-title">Write a New Post</h2>
        <form (ngSubmit)="onSubmit()" #postForm="ngForm" class="post-form">
          <div class="form-row">
            <div class="form-group title-group">
              <input 
                type="text" 
                id="title" 
                name="name" 
                [(ngModel)]="post.name" 
                required
                placeholder="Post Title *"
                class="form-control"
              >
            </div>
            <div class="form-group author-group">
              <input 
                type="text" 
                id="author" 
                name="postedBy" 
                [(ngModel)]="post.postedBy" 
                required
                placeholder="Author Name *"
                class="form-control"
              >
            </div>
          </div>

          <div class="form-group">
            <textarea 
              id="content" 
              name="content" 
              [(ngModel)]="post.content" 
              required
              placeholder="Write your post content here... *"
              class="form-control content-area"
              rows="6"
            ></textarea>
          </div>

          <div class="form-group">
            <input 
              type="url" 
              id="imageUrl" 
              name="imageUrl" 
              [(ngModel)]="post.img" 
              placeholder="Cover Image URL (optional)"
              class="form-control"
            >
          </div>

          <div class="form-actions">
            <button type="button" routerLink="/home" class="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              [disabled]="!postForm.form.valid" 
              class="btn btn-primary"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .create-post-page {
      min-height: calc(100vh - 64px);
      background-color: #f5f6fa;
      padding: 1.5rem 1rem;
    }

    .create-post-container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    }

    .page-title {
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }

    .post-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
    }

    .form-group {
      position: relative;
    }

    .form-control {
      width: 100%;
      padding: 0.625rem;
      border: 2px solid #e8ecef;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      background-color: #f8fafc;
    }

    .form-control:focus {
      outline: none;
      border-color: #3498db;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .form-control::placeholder {
      color: #95a5a6;
      font-size: 0.9rem;
    }

    .content-area {
      resize: vertical;
      min-height: 180px;
      line-height: 1.5;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #2980b9;
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #f1f4f6;
      color: #2c3e50;
    }

    .btn-secondary:hover {
      background-color: #e8ecef;
    }

    @media (max-width: 640px) {
      .create-post-container {
        padding: 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .btn {
        padding: 0.5rem 1rem;
      }
    }
  `]
})
export class CreatePostComponent {
  public post: Omit<Post, 'id'> = {
    content: '',
    name: '',
    img: '',
    postedBy: '',
    likeCount: 0,
    date: new Date().toISOString(),
    tags: []
  };

  constructor(
    private blogService: BlogServiceService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Submitting post:', this.post);
    this.blogService.createPost(this.post).subscribe({
      next: (response: Post) => {
        console.log('Post created successfully:', response);
        this.router.navigate(['/home']);
      },
      error: (error: Error) => {
        console.error('Error creating post:', error);
      }
    });
  }
}
