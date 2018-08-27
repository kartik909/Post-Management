import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
  registerdata: any = {};
  checkRegister: boolean;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  register(){
    this._authService.register(this.registerdata).subscribe((resp: any) => {
      this.checkRegister = resp.flag;
      console.log(this.checkRegister);
      if(this.checkRegister == true){
        alert('You are Registred')
        this._router.navigate(['/login']);
      }
      else{
        alert('Try Again');
      }
    });
  }


}
