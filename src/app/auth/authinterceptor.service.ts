import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { 
  }  

  intercept(req, next){         
    
    var token = this._authService.checkToken();
    var authRequest = req.clone({
      headers: new HttpHeaders().set('authtoken', token)
    });
    return next.handle(authRequest);
  
}
}
