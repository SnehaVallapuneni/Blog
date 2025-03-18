import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogServiceService, Post } from '../blog-service.service';
import { Subscription } from 'rxjs';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteDialogComponent],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  post: Post | null = null;
  postId: string | null = null;
  showDeleteDialog = false;
  postToDelete: string | null = null;
  isLoading = true;
  private routeSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogServiceService
  ) {}

  ngOnInit() {
    // Subscribe to route parameter changes
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      this.isLoading = true;
      
      if (this.postId) {
        this.loadPost(this.postId);
      } else {
        this.loadPosts();
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private loadPost(id: string) {
    this.blogService.getPost(id).subscribe({
      next: (post: Post) => {
        this.post = post;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching post:', error);
        this.router.navigate(['/view-post']);
      }
    });
  }

  loadPosts() {
    this.blogService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  openDeleteDialog(id: string) {
    this.postToDelete = id;
    this.showDeleteDialog = true;
  }

  onDeleteConfirm() {
    if (this.postToDelete) {
      this.blogService.deletePost(this.postToDelete).subscribe({
        next: () => {
          console.log('Post deleted successfully');
          // Remove the deleted post from the local array
          this.posts = this.posts.filter(post => post.id !== this.postToDelete);
          if (this.post?.id === this.postToDelete) {
            this.router.navigate(['/view-post']);
          }
          // Refresh the posts list
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
    this.showDeleteDialog = false;
    this.postToDelete = null;
  }

  onDeleteCancel() {
    this.showDeleteDialog = false;
    this.postToDelete = null;
  }

  viewPostDetails(id: string): void {
    this.router.navigate(['/view-post', id]);
  }

  goBack() {
    this.router.navigate(['/view-post']);
  }
}
