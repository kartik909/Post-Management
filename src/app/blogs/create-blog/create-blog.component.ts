import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  count: number = 0;
  blogData: any = {};
  likedBy:any = [];
  constructor(private _blogService: BlogService, private _authService: AuthService) { }

  ngOnInit() {
   
  }

  submit(){    
 this.blogData.likes = this.count;
  this.blogData.likedBy = this.likedBy;
  this.blogData.username = this._authService.userInfo;
  this._blogService.sendBlog(this.blogData);
  console.log(this.blogData);  
  }
}
