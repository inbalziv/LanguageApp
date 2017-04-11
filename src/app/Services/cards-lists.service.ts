import { Injectable } from '@angular/core';
import {CardsLists} from '../Interfaces/cards-lists';
import {Card} from '../Interfaces/card';
import {CARDS_LISTS} from './Mocks/cards-lists-mock';

@Injectable()
export class CardsListsService {
  _cardsLists: Array<CardsLists>;

  constructor() {
    if (this.getCardsLists())
      this._cardsLists = this.getCardsLists();
    //else this._CardsLists = [];
  }

  ngOnInit() {

  }

  getCardsLists(): Array<CardsLists> {
    return CARDS_LISTS;
   // return this._CardsLists;
  }

  getListNames(): Array<string> {
    var _key: Array<string> = [];
    if (this._cardsLists)
    {
      for (var i = 0; i < this._cardsLists.length; i++)
        _key.push(this._cardsLists[i].listName);
    }
    return _key;
  }

  getCards(listName: string): Array<Card> {
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

}
