import { Routes } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';
import { ViewPostComponent } from '../view-post/view-post.component';

export const POSTS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'create', component: CreatePostComponent },
  { path: 'view/:id', component: ViewPostComponent }
]; 