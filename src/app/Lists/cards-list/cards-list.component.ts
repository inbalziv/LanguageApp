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
  buttonShowAdd: boolean = true;
  constructor(private _cardsListsService:CardsListsService) { }

  ngOnInit() {
    this.getListsName();
  }
  getListsName():void{
    this._listsNameArray = this._cardsListsService.getListNames();
  }
  addList():void{

  }

}
