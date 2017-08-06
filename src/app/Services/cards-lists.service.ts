import { Injectable } from '@angular/core';
import {CardsLists} from '../Interfaces/cards-lists';
import {Card} from '../Interfaces/card';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {forEach} from "@angular/router/src/utils/collection";


@Injectable()
export class CardsListsService {
  public _cardsLists: Array<CardsLists>;
  _http: Http;

  constructor(http: Http) {
    this._http = http;
    this._cardsLists = new Array<CardsLists>();
  }

  ngOnInit() {}
  getCardsListsFromDB(uid:string) {
    return this._http.get('http://localhost:51650/api/data/getdata/' + uid).map((res: Response) => res.json());
  }

  getCardsLists(): Array<CardsLists>{
    return this._cardsLists;
}
  // getCardsListsFromDB(uid:string): Array<CardsLists> {
  //   var obj;
  //   let text = "";
  //  // let _body;
  //   //http://localhost:51650/api/data/getdata/2
  //  // this._http.get('http://localhost:51650/api/data/getdata/' + uid)
  //   this._http.get('http://localhost:51650/api/data/getdata/1')
  //     .map((res) => res["_body"])
  //      .subscribe((res) => {
  //        // var i = 0;
  //        obj = JSON.parse(res).CardLists;
  //
  //        let _cardsListsResults: Array<CardsLists> = this._cardsLists;
  //        for(var item in obj) {
  //          this.createList(item);
  //          this.setCards(item, obj[item]);
  //        }
  //        this._cardsLists = _cardsListsResults;
  //         return _cardsListsResults;
  //       });
  //  // return CARDS_LISTS;
  //   return this._cardsLists;
  // }

  getNames(): Array<string> {
    var _keys: Array<string> = [];
    if (this._cardsLists)
    {
      for (var item in this._cardsLists)
        _keys.push(item);
    }
    return _keys;
  }


  getCards(listName: string) {
    var _cards: Array<Card> = [];
    var _card: Card;
    if (this._cardsLists) {
      for (var i = 0; i < this._cardsLists.length; i++) {
        if (listName === this._cardsLists[i].listName) {
          for (var j = 0; j < this._cardsLists[i].cards.length; j++) {
            _card = {front: this._cardsLists[i].cards[j].front, back: this._cardsLists[i].cards[j].back};
            _cards.push(_card);
          }
          return _cards;
        }
      }
    }
    return _cards;
  }
  setCards(listName: string,newCards: Array<Card>): void {
    if (this._cardsLists) {
      for (var i = 0; i < this._cardsLists.length; i++) {
        if (listName === this._cardsLists[i].listName) {
          this._cardsLists[i].cards = newCards;
          break;
        }
      }
    }
  }
  createList(listName: string): void {
    var _cards: Array<Card> = [];
    var _selecedCardsList: CardsLists = {listName: listName, cards: _cards};
    this._cardsLists.push(_selecedCardsList);
  }
  modifyListName(nameBefore: string, nameAfter: string): void {
    for (var i = 0; i < this._cardsLists.length; i++)
    {
      if (nameBefore === this._cardsLists[i].listName)
      {
        this._cardsLists[i].listName = nameAfter;
        break;
      }
    }
  }
  deleteListName(name: string): void {
    for (var i = 0; i < this._cardsLists.length; i++)
    {
      if (name === this._cardsLists[i].listName)
      {
        this._cardsLists.splice(i,1);
        break;
      }
    }
  }
  addCard(card:Card,listName:string):void{
    var _cards: Array<Card> = [];
    _cards = this.getCards(listName);
    _cards.push(card);
    this.setCards(listName,_cards);
  }
  editCard(card:Card,num:number,listName:string):void{
    var _cards: Array<Card> = [];
    _cards = this.getCards(listName);
    if ((num >= 0) && (num < this.getCards(listName).length))
    {
      //this.deleteCard(num,listName);
      _cards[num].front = card.front;
      _cards[num].back = card.back;
      this.setCards(listName,_cards);
    }

  }
  deleteCard(num:number,listName:string):void{
    if ((num >= 0) && (num < this.getCards(listName).length))
      this.setCards(listName,this.getCards(listName).slice(0,num).concat(this.getCards(listName).slice(num+1,this.getCards(listName).length)));
  }
  setCardsList(list:Array<CardsLists>):void{
    this._cardsLists = list;
  }
}
