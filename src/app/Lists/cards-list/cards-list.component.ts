import { Component, OnInit } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';

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
  index:number;
  constructor(private _cardsListsService:CardsListsService) { }

  ngOnInit() {
    this.getListsName();
    this.initButtonsDisaply();
  }
  getListsName():void{
    this._listsNameArray = this._cardsListsService.getListNames();
  }
  addList():void{
    if (this._listName.trim())
      this._cardsListsService.createList(this._listName);
    this._listName = '';
  }
  editList():void{
    if (this._listName.trim())
      this._cardsListsService.modifyListName(this._listsNameArray[this.index],this._listName);
    this.initButtonsDisaply();
  }
  deleteList():void{
    if (this._listName.trim())
      this._cardsListsService.deleteListName(this._listName);
    this.initButtonsDisaply();
  }
  listClicked(num:number):void{
    this.index = num;
    this._listName = this._listsNameArray[this.index];
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

}
