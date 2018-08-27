import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  count: number = 0;
  blogData: any = {};
  likedBy:any = [];
  constructor(private _blogService: BlogService, 
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
   
  }

  submit(){    
 this.blogData.likes = this.count;
  this.blogData.likedBy = this.likedBy;
  this._authService.$userCheck.subscribe((resp) => {
    this.blogData.username =  resp;
  });
  this._blogService.sendBlog(this.blogData);
  console.log(this.blogData);  
  this._router.navigate(['blogs']);
  }
}
