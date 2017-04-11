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
  buttonShowAdd: boolean;
  buttonShowEdit: boolean;
  buttonShowDelete: boolean;
  setAddCards: boolean;
  _index:number;
  constructor(private _cardsListsService:CardsListsService){ }

  ngOnInit() {
    this.getListsName();
    this.initButtonsDisaply();
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
  editList():void{
    if (this._listName.trim())
      this._cardsListsService.modifyListName(this._listsNameArray[this._index],this._listName);
    this.initButtonsDisaply();
    this.getListsName();
  }
  deleteList():void{
    if (this._listName.trim())
      this._cardsListsService.deleteListName(this._listName);
    this.initButtonsDisaply();
    this.getListsName();
  }
  listClicked(num:number):void{
    this._index = num;
    this._listName = this._listsNameArray[this._index];
    this.buttonShowEdit = true;
    this.buttonShowDelete = true;
    this.buttonShowAdd = false;
}
  private initButtonsDisaply():void{
    this.buttonShowAdd = true;
    this.buttonShowEdit = false;
    this.buttonShowDelete = false;
    this._listName = '';
}
  private setAddCardsShow(state:boolean):void
  {
    this.setAddCards = state;
  }
  private getListSelected():boolean{
    if (this._listName)
      return true;
    else return false;
  }
}
