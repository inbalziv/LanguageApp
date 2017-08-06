import { Injectable } from '@angular/core';
import {Card} from '../Interfaces/card';
import {CARDS} from './Mocks/card-mock';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class CardService {

  constructor() {}
  getCard():Card[]{
    return CARDS;
  }

}
