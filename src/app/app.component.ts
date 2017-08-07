import {Component, OnInit, AfterContentInit} from '@angular/core';
import {UserService} from './Services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,AfterContentInit{
  authenticated:boolean;
  _router:Router;
  constructor(private srvUser:UserService,router: Router) {
    this._router = router;
  }
  ngOnInit() {

  }
  ngAfterContentInit(){
    this._router.events
      .subscribe((event) => {
        this.loginLogoutNav();
      });
  }
  private loginLogoutNav():void
  {
    if (this.srvUser.getLoggedIn() == false)
      this.authenticated = false;
    else this.authenticated = true;
  }
}



