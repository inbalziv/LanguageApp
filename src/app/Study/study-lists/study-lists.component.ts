import { Component, OnInit } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {UserService} from "../../Services/user.service";
import {CardsLists} from '../../Interfaces/cards-lists';

@Component({
  selector: 'app-root',
  templateUrl: './study-lists.component.html',
  styleUrls: ['./study-lists.component.css']

})
export class StudyListsComponent implements OnInit {
  _listsName: Array<string>;
  hideListPage:boolean;
  isLoggedIn:boolean = false;
  private _cardsLists: Array<CardsLists> = [];
  constructor(private _cardsListsService:CardsListsService, private srvUser: UserService){

  }

  async ngOnInit() {
 //   this._cardsLists = await this.getLists();
    this._cardsLists = this._cardsListsService._cards;
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
  getLists() {
   // return this._cardsListsService.getCardsListsFromDB('1').toPromise().then((data) => data.CardLists);
    //     return this._cardsListsService.getCardsListsFromDB('1').toPromise().then((data) => data.CardLists.map(card => ({ name: card.name })));

  }
}
