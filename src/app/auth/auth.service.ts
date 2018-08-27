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
  $authCheck = new BehaviorSubject<any>(this.checkStatus());

  constructor(private _http: HttpClient, private _router: Router) { }

  login(data){
    this._http.post('http://localhost:3000/login', data).subscribe((resp: any) => {
    if(resp.flag == true){
      alert('Success');
      this.$authCheck.next(true);
      localStorage.setItem('token', resp.token);
      console.log(resp.userDetails.username);
      
      this.userInfo = resp.userDetails.username;      
      this._router.navigate(['/login']);
    }
    else{
      alert('Failed');
    }
   });     
  }

  logout(){
    this.$authCheck.next(false);
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
    alert('Logged out');
  }

  register(data){
    return this._http.post('http://localhost:3000/register', data);    
  }

  checkToken(){
  return  localStorage.getItem('token');
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
