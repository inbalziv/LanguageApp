import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../Interfaces/user";
import {USERS} from './Mocks/users-mock';

@Injectable()
export class AuthenticationService {

  constructor(private _router: Router){}

  getUsers():User[]{
    return USERS;
  }
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }

  login(user:User){
    var authenticatedUser:any = this.getUsers().find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem('user', authenticatedUser);
      this._router.navigate(['Home']);
      return true;
    }
    return false;

  }

  checkCredentials(){
    if (localStorage.getItem("user") === null){
      this._router.navigate(['Login']);
    }
  }
}
