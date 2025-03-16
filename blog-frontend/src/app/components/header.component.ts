import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <nav class="nav">
          <a routerLink="/home" class="logo">
            <span class="logo-text">Blog</span>
          </a>
          <div class="nav-links">
            <a 
              routerLink="/home" 
              routerLinkActive="active" 
              [routerLinkActiveOptions]="{exact: true}"
              class="nav-link"
            >
              Posts
            </a>
            <a 
              routerLink="/create-post" 
              routerLinkActive="active" 
              class="nav-link create-post-btn"
            >
              <span class="icon">+</span>
              Create Post
            </a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: var(--box-shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }

    .logo {
      text-decoration: none;
      color: var(--primary-color);
      font-size: 1.5rem;
      font-weight: 700;
    }

    .logo-text {
      background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      color: var(--accent-color);
    }

    .nav-link.active {
      color: var(--accent-color);
      background-color: rgba(52, 152, 219, 0.1);
    }

    .create-post-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--accent-color);
      color: white !important;
    }

    .create-post-btn:hover {
      background-color: #2980b9;
      color: white !important;
    }

    .create-post-btn .icon {
      font-size: 1.2rem;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .nav-links {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent {} 