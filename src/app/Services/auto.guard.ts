import {Injectable, AfterContentInit} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class Guard implements CanActivate,AfterContentInit {
  constructor(private router:Router,private srvUser:UserService){

  }
  ngAfterContentInit()
  {
    this.srvUser.getLoggedIn();
  }
  canActivate(routeSnapshot:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if (this.srvUser.getLoggedIn() != false)
    {
      return true;
    }
    else this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
   // else return false;
  }
}
