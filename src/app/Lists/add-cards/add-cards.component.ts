import { Component, OnInit,ChangeDetectorRef, ChangeDetectionStrategy, Injectable } from '@angular/core';
import {CardsListsService} from '../../Services/cards-lists.service';
import {ActivatedRoute,Router} from '@angular/router';
import {Card} from "../../Interfaces/card";
import { Location } from '@angular/common';
import {UserService} from '../../Services/user.service';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import {Http, Headers, Response} from '@angular/http';

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
  _card:Card = {front:'',back:''};
  _uid: string;
  _listName:string;
  _location: Location;
  _router: Router;
  _cardsArray:Array<Card> = [];
  _index:number;

  constructor(private activatedRoute: ActivatedRoute,
              private _cardsListsService:CardsListsService,
              private location: Location,router: Router,
              private _cdRef: ChangeDetectorRef,
              private _srvUser: UserService) {
    this._location = location;
    this._router = router;

  }
  async ngOnInit() {
    this._uid = await this.getUID();
    this.sub = this.activatedRoute.params.subscribe(params => this._listName = params['name']);
    this._cardsArray = await this.getCards();
    this.initButtonsDispaly();
  }
  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getUID(){
    return this._srvUser.getUID();
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
  //  this._card = {front:'',back:''};
  }
  //return this._cardsListsService.getCardsListsFromDB('1').toPromise().then((data) => data.CardLists);
  getCards(){
    // this._cardsArray = this._cardsListsService.getCards(this._listName);
    return this._cardsListsService.getCardsDB(this._uid, this._listName).toPromise().then((data) => data);
  }
}
