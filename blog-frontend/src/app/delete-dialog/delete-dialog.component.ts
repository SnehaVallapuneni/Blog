import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="isOpen">
      <div class="dialog-content">
        <h2>Delete Post</h2>
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
        <div class="dialog-actions">
          <button class="cancel-btn" (click)="onCancel()">Cancel</button>
          <button class="delete-btn" (click)="onConfirm()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .dialog-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 90%;
    }

    h2 {
      color: #4a148c;
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    p {
      color: #666;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .cancel-btn, .delete-btn {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cancel-btn {
      background: #f5f5f5;
      color: #666;
    }

    .delete-btn {
      background: #ffebee;
      color: #c62828;
    }

    .cancel-btn:hover {
      background: #e0e0e0;
    }

    .delete-btn:hover {
      background: #ffcdd2;
    }

    @media (max-width: 480px) {
      .dialog-content {
        padding: 1.5rem;
        width: 95%;
      }

      .dialog-actions {
        flex-direction: column;
      }

      .cancel-btn, .delete-btn {
        width: 100%;
      }
    }
  `]
})
export class DeleteDialogComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  isOpen = true;

  onConfirm() {
    this.confirm.emit();
    this.isOpen = false;
  }

  onCancel() {
    this.cancel.emit();
    this.isOpen = false;
  }
} 