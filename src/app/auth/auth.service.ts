import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(data){
  
  }

  register(data){
    this._http.post('http://localhost:3000/register', data)
    .subscribe((resp) => {
      console.log(resp);      
    });
  }
}
