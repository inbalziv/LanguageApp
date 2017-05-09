import { Component } from '@angular/core';
import {UserService} from './Services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated:boolean;
  constructor() {
  //private srvUser:UserService
    //this.authenticated = this.srvUser.loggedIn();
    this.authenticated = false;
  }
}



