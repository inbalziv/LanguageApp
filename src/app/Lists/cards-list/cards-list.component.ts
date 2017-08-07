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
  //const p: Promise<string> = new Promise();
  _listName: string = '';
 // _cardsLists:Array<Object>;
  setAddCards: boolean;
  uid: string = '';
  sub: any;
  //_index:number;
  private _listsNameArray: Array<string> = [];
  private _cardsLists: Array<CardsLists> = [];
  constructor(public _cardsListsService:CardsListsService,private _srvUser: UserService, http: Http){
    // this.uid = '1';
    // http.get('http://localhost:51650/api/data/getdata/' + this.uid)
    //   .map(response => response.json())
    //   .subscribe(res => this._cardsLists =res.json());
    //this.getLists();
   // this._cardsLists =  this._cardsListsService.getCardsLists('1');
   // this.getLists();
   // this.getListsName();
  }


  async ngOnInit() {
    await this._srvUser.getUID().then(id => {console.log(id);this.uid = id});
    this._cardsLists = await this.getLists();
    this._cardsListsService._cardsLists = this._cardsLists;
    this.getListsName();
    this.setAddCardsShow(false);
  }

  getListsName():void{
    this._listsNameArray = this._cardsListsService.getNames();
  }
  getUID(){
    return this._srvUser.getUID();//.toPromise().then((data) => data.UID.toString());
  }
  addList():void{
    if (this._listName.trim())
      this._cardsListsService.createList(this._listName);
    this.getListsName();
    this._listName = '';
  }
  getLists() {
    return this._cardsListsService.getCardsListsFromDB('1').toPromise().then((data) => data.CardLists);
  //     return this._cardsListsService.getCardsListsFromDB('1').toPromise().then((data) => data.CardLists.map(card => ({ name: card.name })));

  }
  deleteList(listName:string):void{
    if (listName.trim())
      this._cardsListsService.deleteListName(listName);
    this.getListsName();
  }
  private setAddCardsShow(state:boolean):void
  {
    this.setAddCards = state;
  }

}
