import { Injectable } from '@angular/core';
import {CardsLists} from '../Interfaces/cards-lists';
import {Card} from '../Interfaces/card';
import {CARDS_LISTS} from './Mocks/cards-lists-mock';

@Injectable()
export class CardsListsService {
  _CardsLists: Array<CardsLists>;

  constructor() {
    if (this.getCardsLists())
      this._CardsLists = this.getCardsLists();
    //else this._CardsLists = [];
  }

  ngOnInit() {

  }

  getCardsLists(): Array<CardsLists> {
    return CARDS_LISTS;
   // return this._CardsLists;
  }

  getListNames(): Array<string> {
    var _cardsLists: Array<CardsLists>;
    var _key: Array<string> = [];
    if (this.getCardsLists())
      _cardsLists = this.getCardsLists();
    for (var i = 0; i < _cardsLists.length; i++)
      _key.push(_cardsLists[i].listName);
    return _key;
  }

  getCards(listName: string): Array<Card> {
    var _cardsLists: Array<CardsLists>;
    var _cards: Array<Card> = [];
    var _card: Card;
    if (this.getCardsLists())
      _cardsLists = this.getCardsLists();
    for (var i = 0; i < _cardsLists.length; i++) {
      if (listName === _cardsLists[i].listName) {
        for (var j = 0; j < _cardsLists[i].cards.length; j++) {
          _card = {front: _cardsLists[i].cards[j].front, back: _cardsLists[i].cards[j].back};
          _cards.push(_card);
        }
        return _cards;
      }
    }
    return _cards;

  }

  createList(listName: string): void {
    var _cards: Array<Card> = [];
    var _cardsList: CardsLists = {listName: listName, cards: _cards};
    this._CardsLists.push(_cardsList);
  }

  modifyListName(nameBefore: string, nameAfter: string): void {
    var _lists: Array<CardsLists>;
    if (this.getCardsLists())
      _lists = this.getCardsLists();
    for (var i = 0; i < _lists.length; i++)
    {
      if (nameBefore === _lists[i].listName)
      {
        _lists[i].listName = nameAfter;
        break;
      }
    }
  }
  deleteListName(name: string): void {
    var _lists: Array<CardsLists>;
    if (this.getCardsLists())
      _lists = this.getCardsLists();
    for (var i = 0; i < _lists.length; i++)
    {
      if (name === _lists[i].listName)
      {
        this._CardsLists.splice(i,1);
        break;
      }
    }
  }


}
