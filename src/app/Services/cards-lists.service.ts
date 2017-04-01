import { Injectable } from '@angular/core';
import {CardsLists} from '../Interfaces/cards-lists';
import {Card} from '../Interfaces/card';
import {CARDS_LISTS} from './Mocks/cards-lists-mock';

@Injectable()
export class CardsListsService {
  _CardsLists:Array<CardsLists>;
  constructor() {
    if (this.getCardsLists())
      this._CardsLists = this.getCardsLists();
  }
  ngOnInit() {

  }
  getCardsLists():Array<CardsLists> {
    return CARDS_LISTS;
  }

  getListNames():Array<string>{
    var _cardsLists: Array<CardsLists>;
    var _key: Array<string> = [];
    if (this.getCardsLists())
      _cardsLists = this.getCardsLists();
    for (var i = 0; i < _cardsLists.length; i++)
          _key.push(_cardsLists[i].listName);
    return _key;
  }
  getCards(listName:string):Array<Card>{
    var _cardsLists: Array<CardsLists>;
    var _cards: Array<Card> = [];
    var _card:Card;
    if (this.getCardsLists())
      _cardsLists = this.getCardsLists();
    for (var i = 0; i < _cardsLists.length; i++)
    {
      if (listName ===_cardsLists[i].listName)
      {
        for (var j = 0; j < _cardsLists[i].cards.length; j++)
        {
          _card = {front:_cardsLists[i].cards[j].front,back:_cardsLists[i].cards[j].back};
          _cards.push(_card);
        }
        return _cards;
      }
    }
    return _cards;

  }

}
