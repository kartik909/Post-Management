import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

 
  blogSubscription: any;
  blogs: any = [];
  constructor(private _blogService: BlogService, private _route: Router) { }

  ngOnInit() {    
    this.blogSubscription =  this._blogService.getBlogs().subscribe((resp: any) => {
     this.blogs = resp;  
     console.log(resp);            
    });         
  }

//   details(data){  
// console.log(data);
//     this._route.navigate(['/blogs/:title']);    
//   }
  ngOnDestroy() {
    this.blogSubscription.unsubscribe();
  }

}
