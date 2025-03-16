import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '/home' }
]; 