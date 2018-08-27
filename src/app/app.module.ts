import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
//import { CookieService } from '.ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './blogs/blog.service';
import { BlogsComponent } from './blogs/blogs/blogs.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { BlogdetailsComponent } from './blogs/blogdetails/blogdetails.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    HomeComponent,
   
    BlogsComponent,
    CreateBlogComponent,
    BlogdetailsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'register', component: RegisterComponent },
      {path: 'login', component: LoginComponent},
      {path: 'blogs', component: BlogsComponent, canActivate: [AuthGuard]},
      {path: 'blog/:title', component: BlogdetailsComponent, canActivate: [AuthGuard]},
      {path: 'create-blog', component: CreateBlogComponent, canActivate: [AuthGuard]}
    ])    
  ],
  providers: [AuthGuard, BlogService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService, 
    multi: true
  }
],

  bootstrap: [AppComponent]
})
export class AppModule { }
