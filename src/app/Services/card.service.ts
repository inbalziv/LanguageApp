import { Injectable } from '@angular/core';
import {Card} from '../Interfaces/card';
import {CARDS} from './Mocks/card-mock';
@Injectable()
export class CardService {

  constructor() {}
  getCard():Card[]{
    return CARDS;
  }

}
