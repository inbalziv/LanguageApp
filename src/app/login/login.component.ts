import { Component, OnInit, AfterContentInit } from '@angular/core';
import {UserService} from '../Services/user.service';
import any = jasmine.any;
//import {User} from "../Interfaces/user";
//import {Router} from "@angular/router";
declare var gigya;

@Component({

  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})


export class LoginComponent implements OnInit,AfterContentInit {
  public UID: string;
  public errorMsg = '';
  public isLoggedin:number;
  private _screenSet: string = 'Default-RegistrationLogin';
  private _containerID:string = 'screen-set';
  private dataLoading:boolean = false;
 // private _user: User;
  constructor(private _srvUser: UserService) {

  }

  ngOnInit() {
  //  this.callScreenSet();
   // this.callGetAccountInfo();
  }
  ngAfterContentInit() {
    this.callScreenSet();
  }

  public callScreenSet():void
  {
    gigya.accounts.showScreenSet({screenSet: this._screenSet, containerID: this._containerID});
    // gigya.accounts.getJWT({callback: function (response) {
    //   if (response.errorCode != 0) {
    //     gigya.accounts.showScreenSet({screenSet: this._screenSet, containerID: this._containerID});
    //   }
    // }});
    this.callGetAccountInfo();
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
public callGetAccountInfo():void{
    var params = {
       callback: function (response) {
        if (response.errorCode == 0) {
          this._srvUser.setUID(response.UID);
           alert('UID: ' + response.UID);
         // return response.errorCode;
        }
      }
    }
    gigya.accounts.getAccountInfo(params);

}

}

