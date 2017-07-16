import {Component, OnInit, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {UserService} from '../../Services/user.service';
import {CardsLists} from '../../Interfaces/cards-lists';
import {ActivatedRoute,Router} from '@angular/router';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit  {
  component:{};
  _listName: string = '';
  _listsNameArray: Array<string> = [];
  public _cardsLists: Array<CardsLists> = [];
  setAddCards: boolean;
  uid:string;
  sub: any;
  //_index:number;
  constructor(public _cardsListsService:CardsListsService,private _srvUser: UserService){

   // this._cardsLists =  this._cardsListsService.getCardsLists('1');
   // this.getLists();
   // this.getListsName();
  }

  ngOnInit() {
    this.uid = this._srvUser.getUID();

      this.getLists();
    //this._cardsLists = this._cardsListsService.getCardsLists();
    this.getListsName();
    this.setAddCardsShow(false);
  }

  getListsName():void{
   // this.getLists();
    this._listsNameArray = this._cardsListsService.getNames();
  }
  addList():void{
    if (this._listName.trim())
      this._cardsListsService.createList(this._listName);
    this.getListsName();
    this._listName = '';
  }
  getLists(): void{
     this.sub = this._cardsListsService.getCardsListsFromDB('1').subscribe(
      (data) => {this._cardsLists = data.CardLists}
     //  , (err)=>console.log(err),
     // ()=>console.log("Done")
    );
    this._cardsListsService._cardsLists =  this._cardsLists;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
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
