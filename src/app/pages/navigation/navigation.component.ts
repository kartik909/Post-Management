import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  authCheck: boolean;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.$authCheck.subscribe((resp) =>{
      this.authCheck = resp;
    })
  }
  logout(){
    this._authService.logout();
  }

  check(){
   return this._authService.checkStatus();
  }
}
