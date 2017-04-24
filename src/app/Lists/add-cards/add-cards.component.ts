import { Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {ActivatedRoute,Router} from '@angular/router';
import {Card} from "../../Interfaces/card";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-cards',
  templateUrl: 'add-cards.component.html',
  styleUrls: ['add-cards.component.css']
})
export class AddCardsComponent implements OnInit {
  name: any;
  url: any;
  sub: any;
  buttonShowAdd: boolean;
  buttonShowEdit: boolean;
  buttonShowDelete: boolean;
  _card:Card;
  _listName:string;
  _location: Location;
  _router: Router;
  _cardsArray:Array<Card> = [];
  _index:number;
 // _changeDetectionStrategy: ChangeDetectionStrategy.Default;
  constructor(private activatedRoute: ActivatedRoute,private _cardsListsService:CardsListsService,
              location: Location,router: Router,private _cdRef: ChangeDetectorRef) {
    this._location = location;
    this._router = router;

  }
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => this.name = params['name']);
    this._router.events.subscribe((val) => {
      if(this._location.path() != '')
        this.url = this._location.path();
       else {
        this.url = ''
      }
    });
    this.getListName();
    this._cardsArray = this._cardsListsService.getCards(this._listName);
    this.initButtonsDispaly();
  }
  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getListName():string {
    if (this._location.path() != '') {
      this.url = this._location.path();
      this._listName = this.url.split('/')[3];
      return this._listName;
    }
  }

  private cardClicked(num:number):void{
    this._index = num;
    this._card = this._cardsArray[this._index];
    this.buttonShowAdd = false;
    this.buttonShowEdit = true;
    this.buttonShowDelete = true;

  }
  private addCard():void{
    this._cardsListsService.addCard(this._card,this._listName);
    this._cdRef.markForCheck();
    this.getCards();
    this.initButtonsDispaly();
  }
  private editCard():void{
    this._cardsListsService.editCard(this._card,this._index,this._listName);
    this.initButtonsDispaly();
  }
  private deleteCard():void{
    this._cardsListsService.deleteCard(this._index,this._listName);
    this.getCards();
    this.initButtonsDispaly();
  }
  private initButtonsDispaly():void{
    this.buttonShowAdd = true;
    this.buttonShowEdit = false;
    this.buttonShowDelete = false;
    this._card = {front:'',back:''};
  }
  private getCards():void{
    this._cardsArray = this._cardsListsService.getCards(this._listName);
  }
}
