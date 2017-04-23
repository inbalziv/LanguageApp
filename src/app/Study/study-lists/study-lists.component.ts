import { Component, OnInit } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './study-lists.component.html',
  styleUrls: ['./study-lists.component.css']

})
export class StudyListsComponent implements OnInit {
  _listsName: Array<string>;
  hideListPage:boolean;
  constructor(private _cardsListsService:CardsListsService){

  }

  ngOnInit() {
    this.getListsName();
    this.hideList(false);
  }
  getListsName():void{
    this._listsName = this._cardsListsService.getListNames();
  }

  //TBD: check if list is not empty
  hideList(hide:boolean):void{
    this.hideListPage = hide;
  }
}
