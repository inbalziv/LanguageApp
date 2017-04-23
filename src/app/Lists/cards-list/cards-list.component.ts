import { Component, OnInit } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
  _listName: string = '';
  _listsNameArray: Array<string>;
  setAddCards: boolean;
  //_index:number;
  constructor(private _cardsListsService:CardsListsService){ }

  ngOnInit() {
    this.getListsName();
    this.setAddCardsShow(false);

  }
  getListsName():void{
    this._listsNameArray = this._cardsListsService.getListNames();
  }
  addList():void{
    if (this._listName.trim())
      this._cardsListsService.createList(this._listName);
    this.getListsName();
    this._listName = '';
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
  // private getListSelected():boolean{
  //   if (this._listName)
  //     return true;
  //   else return false;
  // }
}
