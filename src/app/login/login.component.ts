import { Component, OnInit, AfterContentInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import any = jasmine.any;
import {User} from "../Interfaces/user";
import { Location } from '@angular/common';
import {Router, UrlSerializer} from "@angular/router";
declare var gigya;

@Component({

  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})


export class LoginComponent implements OnInit,AfterContentInit  {
  public _UID: string;
  public errorMsg = '';
  public isLoggedin:number;
  private _screenSet: string = 'Default-RegistrationLogin';
  private _containerID:string = 'screen-set';
  private dataLoading:boolean = false;
  private _user: User;
  private _redirectPage;
  private _location: string;
  constructor(private _srvUser: UserService,location: Location,router:Router) {
    this._redirectPage = '';
   // this._location = location.path().;
    this._location = decodeURIComponent(router.url);
  }

  async ngOnInit() {
    this._user = await this._srvUser.getUser();
    if (this._location.indexOf('returnUrl') > 0)
         this._redirectPage = 'http://localhost:4201/#' + this._location.slice(this._location.indexOf('returnUrl=')+10,this._location.length);
  }
  ngAfterContentInit() {
    this.callScreenSet();
  }

  public callScreenSet():void {
    var params = {
      callback: (response) => {
        this._UID = response.UID;
        if (response.errorCode != 0) {
          gigya.accounts.showScreenSet({
            screenSet: this._screenSet,
            containerID: this._containerID,
            redirectURL: this._redirectPage
          });
          this._srvUser.setLoggedIn(true);
        }
      }
    };
    gigya.accounts.getAccountInfo(params);
  }

  public callGetAccountInfo():void
  {
    var params = {
       callback: (response) =>  {
        if (response.errorCode == 0) {
           this._UID = response.UID;
        }
      }
    };
    gigya.accounts.getAccountInfo(params);
    this.alertUID();

  }
  public alertUID():void
  {
 // alert('UID: ' + this._UID);
  }
}


