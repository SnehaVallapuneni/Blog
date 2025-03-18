import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogServiceService, Post } from '../blog-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  post: Omit<Post, 'id'> = {
    title: '',
    content: '',
    author: '',
    createdAt: new Date(),
    tags: [],
    imageUrl: ''
  };
  tagsInput: string = '';
  imagePreview: string | null = null;

  constructor(
    private blogService: BlogServiceService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        this.post.imageUrl = this.imagePreview;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Convert comma-separated tags string to array
    this.post.tags = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // Submit the post
    this.blogService.createPost(this.post).subscribe({
      next: (response: Post) => {
        console.log('Post created successfully:', response);
        // Reset form
        this.post = {
          title: '',
          content: '',
          author: '',
          createdAt: new Date(),
          tags: [],
          imageUrl: ''
        };
        this.tagsInput = '';
        this.imagePreview = null;
        this.router.navigate(['/home']);
      },
      error: (error: Error) => {
        console.error('Error creating post:', error);
      }
    });
  }
}
