import { Component, OnInit } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './study-lists.component.html',
  styleUrls: ['./study-lists.component.css']

})
export class StudyListsComponent implements OnInit {
  _listsName: Array<string>;
  hideListPage:boolean;
  isLoggedIn:boolean = false;
  constructor(private _cardsListsService:CardsListsService, private srvUser: UserService){

  }

  ngOnInit() {
    this.getListsName();
    this.hideList(false);
    this.isLoggedIn = this.srvUser.getLoggedIn();
  }
  getListsName():void{
    this._listsName = this._cardsListsService.getNames();
  }
  //TBD: check if list is not empty
  hideList(hide:boolean):void{
    this.hideListPage = hide;
  }
}
