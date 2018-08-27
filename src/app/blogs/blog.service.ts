import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  data: any;
  constructor(private _http: HttpClient) { }
 
  getBlogs(){   
   return this._http.get('http://localhost:3000/blogs');                
  }
  
  sendBlog(data){
    console.log(data);    
    return this._http.post('http://localhost:3000/createblog',data).subscribe((resp) => {
      console.log(resp);   
    }); 
  }

  blogDetails(data){
    return this._http.get('http://localhost:3000/blog/'+ data);
  }

  sendComment(data){
    return this._http.post('http://localhost:3000/insertcomment',data);
  }

  likeBlog(data){
    return this._http.post('http://localhost:3000/likeblog', data);
  }
}
