import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {

  commentDetails:any = {};
  
  blogDetail: any = {};
  displayComment: any;
  totalLikes: any;
  detailsforLike: any = {};
  user: any;
  likeDisplay: any = {};
  likedUser: any = [];
  constructor(private _activatedROute: ActivatedRoute, private _blogService: BlogService, private _authService: AuthService) { }

  ngOnInit() {
//    console.log(this._activatedROute.snapshot.params.title);  
    this._blogService.blogDetails(this._activatedROute.snapshot.params.title).subscribe((resp: any) => {
      this.blogDetail = resp.blogDetails;
     this.blogDetail.username = resp.blogDetails.username;
      this.commentDetails.commentedBy = this._authService.userInfo;                
      this.blogDetail.comment = this.commentDetails;
      this.detailsforLike = this.blogDetail;                           
      this.user = resp.blogDetails.username;      
      this.detailsforLike.username = this._authService.userInfo;                           
      console.log(resp.blogDetails);
      
    });          
  }

  submit(){
       this._blogService.sendComment(this.blogDetail).subscribe((resp: any) => {
        this.displayComment = resp.blogDetails;
        console.log(this.displayComment);        
      });
//       console.log(this.blogDetail.comment);       
  }

  likeBlog(){
 // this.blogDetail.username = this._authService.userInfo;
 //this.detailsforLike = this.user;
    this._blogService.likeBlog(this.detailsforLike).subscribe((resp: any) => {
     
      this.likeDisplay = resp.LikeDetails;
      this.totalLikes = resp.likes;        
  //    this.likedUser =   this.likeDisplay;
    this.likedUser = this.likeDisplay.filter((v, i, a) => a.indexOf(v) === i);  
    console.log(this.likedUser);
    
    });;
    
    
  }



}
