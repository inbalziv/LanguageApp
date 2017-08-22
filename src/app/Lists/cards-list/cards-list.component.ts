import {Component, OnInit, EventEmitter, Output, AfterViewInit, AfterContentInit} from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {UserService} from '../../Services/user.service';
import {CardsLists} from '../../Interfaces/cards-lists';
import {ActivatedRoute,Router} from '@angular/router';
import {isNullOrUndefined} from "util";
import {Http} from "@angular/http";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit  {

  _listName: string = '';
 // _cardsLists:Array<Object>;
  setAddCards: boolean;
  uid: string = '';
  sub: any;
  //_index:number;
  private _listsNameArray: Array<string> = [];
  private _cardsLists: Array<CardsLists> = [];
  constructor(public _cardsListsService:CardsListsService,private _srvUser: UserService, http: Http){

  }

  async ngOnInit() {
    this.uid = await this.getUID();
    this._listsNameArray = await this.getLists();
   // this._cardsListsService._cardsLists = this._cardsLists;
   // this.getListsName();
    this.setAddCardsShow(false);
  }

  // getListsName():void{
  //   this._listsNameArray = this._cardsListsService.getNames();
  // }
  getUID(){
    return this._srvUser.getUID();
  }
  async addList(){
    if (this._listName.trim())
    {
      await this._cardsListsService.createList(this.uid, this._listName);
      this._listsNameArray = await this.getLists();
    }
    this._listName = '';
  }
  getLists() {
    return this._cardsListsService.getListsNameFromDB(this.uid).toPromise().then((data) => data);
  }
  deleteList(listName:string):void{
    if (listName.trim())
      this._cardsListsService.deleteList(listName);
    this.getLists();
  }
  private setAddCardsShow(state:boolean):void {
    this.setAddCards = state;
  }
  private EditListname( listName: string){

  }
}
