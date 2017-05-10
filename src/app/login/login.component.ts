import { Component, OnInit, AfterContentInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import any = jasmine.any;
import {User} from "../Interfaces/user";
//import {Router} from "@angular/router";
declare var gigya;

@Component({

  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})


export class LoginComponent implements OnInit,AfterContentInit {
  public _UID: string;
  public errorMsg = '';
  public isLoggedin:number;
  private _screenSet: string = 'Default-RegistrationLogin';
  private _containerID:string = 'screen-set';
  private dataLoading:boolean = false;
  private _user: User;

  constructor(private _srvUser: UserService) {

  }

  ngOnInit() {
    this._user = this._srvUser.getUser();
   // this._UID = this._srvUser.getUID();
  //  this.callScreenSet();
   // this.callGetAccountInfo();
  }
  ngAfterContentInit() {
    this.callScreenSet();
  }

  public callScreenSet():void
  {
    var params = {
      callback: (response) =>  {
        this._UID = response.UID;
        if (response.errorCode != 0) {
          gigya.accounts.showScreenSet({screenSet: this._screenSet, containerID: this._containerID});
          this._srvUser.setLoggedIn(true);
        }

      }
    };
    gigya.accounts.getAccountInfo(params);



    // gigya.accounts.getJWT({callback: function (response) {
    //   if (response.errorCode != 0) {
    //     gigya.accounts.showScreenSet({screenSet: this._screenSet, containerID: this._containerID});
    //   }
    // }});

   // this.UID = this._srvUser.getUID();
  }

//   public getJWT():void
//   {
//     gigya.accounts.getJWT({
//     callback: function (response) {
//       return response.errorCode;
//     }
//     });
//   }
//
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
  alert('UID: ' + this._UID);
}
}

// var UID = response.UID;
// var srvUser: UserService;
// srvUser.setUID(_UID);
//  _srvUser.setUID(response.UID);

// return response.errorCode;
