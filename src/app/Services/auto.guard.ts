import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class Guard implements CanActivate {
  constructor(private router:Router,private srvUser:UserService){

  }

  canActivate(routeSnapshot:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if (this.srvUser.getLoggedIn())
    {
      return false;
    }
  //  else this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    else return true;
  }
}
