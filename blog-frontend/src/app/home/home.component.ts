import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <h1>Welcome to the Blog</h1>
      <div class="actions">
        <a routerLink="/posts" class="btn btn-primary">View Posts</a>
        <a routerLink="/create-post" class="btn btn-secondary">Create Post</a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 4rem 1rem;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: var(--primary-color);
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
  `]
})
export class HomeComponent {}
