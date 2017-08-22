import { Injectable } from '@angular/core';
import {CardsLists} from '../Interfaces/cards-lists';
import {ActivatedRoute,Router} from '@angular/router';
import {Card} from '../Interfaces/card';
import 'rxjs/add/operator/toPromise';
import { Location } from '@angular/common';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {forEach} from "@angular/router/src/utils/collection";


@Injectable()
export class CardsListsService {
  public _cards: Array<CardsLists>;
  _http: Http;
  _listName:string;
  _sub: any;
  _name:any;
  _url: any;
  _router: Router;
  _location: Location;
  constructor(http: Http,location: Location,router: Router, private activatedRoute: ActivatedRoute) {
    this._http = http;
    this._router = router;
    this._location = location;
   // this._listName = this.getListName();
    this._cards;

  }

  ngOnInit() {}

  getListsNameFromDB(uid:string) {
    return this._http.get('http://localhost:51650/api/data/getlistsname/' + uid).map((res: Response) => res.json());
  }
  getCardsDB(uid:string,listName:string ) {
    return this._http.get('http://localhost:51650/api/data/getcards/' + uid + '?listname=' + listName).map((res: Response) => res.json());
  }

  getCardsLists(): Array<CardsLists>{
    return this._cards;
}

  getNames(): Array<string> {
    var _keys: Array<string> = [];
    if (this._cards)
    {
      for (var item in this._cards)
        _keys.push(item);
    }
    return _keys;
  }

  // getCards(listName: string) {
  //   var _cards: Array<Card> = [];
  //   var _card: Card;
  //   if (this._cards) {
  //     var cards = this._cards[listName];
  //     for (var i = 0; i < cards.length; i++)
  //     {
  //       _card = {front: cards[i]["_front"], back: cards[i]["_back"]};
  //       _cards.push(_card);
  //     }
  //   }
  //   return _cards;
  // }
  setCards(listName: string,newCards: Array<Card>): void {
    if (this._cards) {
      for (var i = 0; i < this._cards.length; i++) {
        if (listName === this._cards[i].listName) {
          this._cards[i].cards = newCards;
          break;
        }
      }
    }
  }
  /*createList(uid:string, listName: string) {
    //let data = "{ '_listName': '" + listName + "'}";
    let data = JSON.stringify({_listName:'Joe'});
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return this._http.post('http://localhost:51650/api/data/addList/' + uid, data, {headers: headers}).map((res: Response) => res);
    return this._http.post('http://localhost:51650/api/data/addList/' + uid, data);*/

    createList(uid:string, listName: string){
      let headers = new Headers({'Content-Type': 'application/json'});
      let data = {_listName: listName};
      let options = new RequestOptions({headers: headers});
      return this._http.post('http://localhost:51650/api/data/addList/' + uid, JSON.stringify(data), options).map((res: Response) => res);
  }


  modifyListName(nameBefore: string, nameAfter: string): void {
    for (var i = 0; i < this._cards.length; i++)
    {
      if (nameBefore === this._cards[i].listName)
      {
        this._cards[i].listName = nameAfter;
        break;
      }
    }
  }
  deleteList(name: string): void {
    for (var i = 0; i < this._cards.length; i++)
    {
      if (name === this._cards[i].listName)
      {
        this._cards.splice(i,1);
        break;
      }
    }
  }
  addCard(card:Card,listName:string):void{
    // var _cards: Array<Card> = [];
    // _cards = this.getCards(listName);
    // _cards.push(card);
    // this.setCards(listName,_cards);
  }
  editCard(card:Card,num:number,listName:string):void{
    // var _cards: Array<Card> = [];
    // _cards = this.getCards(listName);
    // if ((num >= 0) && (num < this.getCards(listName).length))
    // {
    //   //this.deleteCard(num,listName);
    //   _cards[num].front = card.front;
    //   _cards[num].back = card.back;
    //   this.setCards(listName,_cards);
    // }

  }
  deleteCard(num:number,listName:string):void{
    // if ((num >= 0) && (num < this.getCards(listName).length))
    //   this.setCards(listName,this.getCards(listName).slice(0,num).concat(this.getCards(listName).slice(num+1,this.getCards(listName).length)));
  }
  setCardsList(list:Array<CardsLists>):void{
    this._cards = list;
  }
}
