import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  check: boolean = false;
  userInfo: any;
  $userCheck = new BehaviorSubject<any>(this.checkUser());
  $authCheck = new BehaviorSubject<any>(this.checkStatus());

  constructor(private _http: HttpClient, private _router: Router, private _authService: AuthService) { }

  login(data){
    this._http.post('http://localhost:3000/login', data).subscribe((resp: any) => {
    if(resp.flag == true){
      alert('Success');
      this.$authCheck.next(true);
      localStorage.setItem('token', resp.token);
      console.log(resp.userDetails.username);
      localStorage.setItem('user', resp.userDetails.username);
      this.$userCheck.next(localStorage.getItem('user'));
      this.userInfo = resp.userDetails.username;      
      this._router.navigate(['/blogs']);
    }
    else{
      alert('Failed');
    }
   });     
  }

  logout(){    
    this.$authCheck.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.$userCheck.next('');
    this._router.navigate(['/login']);
    alert('Logged out');
  }

  register(data){
    return this._http.post('http://localhost:3000/register', data);    
  }

  checkToken(){
  return  localStorage.getItem('token');
  }

  checkUser(){
    if(localStorage.getItem('user')){
      return localStorage.getItem('user');      
    }
   
  }
  checkStatus(){
    if(localStorage.getItem('token')){
      return true;      
    }
    else{
      return false;
    }
  }
}
