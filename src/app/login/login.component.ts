import { Component, OnInit,ElementRef } from '@angular/core';
import {AuthenticationService} from '../Services/authentication.service';
import {User} from '../Interfaces/user';
// Include Gigya's SDK
import { Gigya } from 'gigya';
import {$} from "protractor";
//declare var gigya1: any;
@Component({
 // selector: 'app-login',
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public UID: string;
  public errorMsg = '';
  private _screenSet: string = 'Default-RegistrationLogin';
  private _containerID:string = 'screenSet';
  public _gigya = new Gigya();
  private dataLoading:boolean = false;

  constructor() {}

  ngOnInit() {
  //  this.loadScreenset();
  }
  // ngAfterViewInit() {
  //   var s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src = "http://somedomain.com/somescript";
  //   s.onload(this.loadScreenset());
  //   $("body"). .append(this._gigya.accounts.showScreenSet({ screenSet: this._screenSet}));
  //  // this.elementRef.nativeElement.appendChild(s);
  // }


  private loadScreenset() {
      this._gigya.accounts.getAccountInfo({UID: 'dd'});
      this._gigya.accounts.showScreenSet({ screenSet: this._screenSet});
  //  this._gigya.accounts.getAccountInfo()
  }
}
