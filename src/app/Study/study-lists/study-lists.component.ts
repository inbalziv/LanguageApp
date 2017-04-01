import { Component, OnInit } from '@angular/core';
import {CardService} from '../../Services/card.service';
import {CardsListsService} from '../../Services/cards-lists.service';
import {CardsLists} from '../../Interfaces/cards-lists';
@Component({
  selector: 'app-root',
  templateUrl: './study-lists.component.html',
  styleUrls: ['./study-lists.component.css']

})
export class StudyListsComponent implements OnInit {
  _listsName: Array<string>;
  constructor(private _cardService: CardService, private _cardsListsService:CardsListsService){
  }

  ngOnInit() {
    this.getListsName();
  }
  getListsName():void{
    this._listsName = this._cardsListsService.getListNames();
  }
}
