import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { CardsListsService } from '../../Services/cards-lists.service';
import { StudyOptionsService } from '../../Services/study-options.service';
import {Card} from '../../Interfaces/card';
import { Location } from '@angular/common';
import {StudyOptions} from '../../Interfaces/study-options';

@Component({
  selector: 'app-study-words',
  templateUrl: 'study-words.component.html',
  providers: [CardsListsService,StudyOptionsService],
  styleUrls: ['study-words.component.css']
})
export class StudyWordsComponent implements OnInit {

  _listName: any;
  _studyOptions: StudyOptions;
  buttonShowAnswer:boolean = true;
  name:any;
  study:any;
  sub: any;
  url: any;
  index: number = 0;
  _cardQuestion:string;
  _cardAnswer:string;
  _showAnswer:boolean = false;
  _cards: Array<Card>;
  buttonsResults:boolean = false;
  _location: Location;
  _router: Router;
  constructor(private activatedRoute: ActivatedRoute,private _cardsListsService:CardsListsService,location: Location,router: Router,private _studyOptionsService:StudyOptionsService) {
    this._location = location;
    this._router = router;
    this._studyOptions = this._studyOptionsService.getStudyOptions();
  }
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => this.name = params['name']);
    this._router.events.subscribe((val) => {
      if(this._location.path() != ''){
        this.url = this._location.path();
        if (this._listName == null)
          this._listName = this.url.split('/')[3];
      } else {
        this.url = ''
      }
    });
    this.getCardsList();
    this.playCards();
  }

  getListName():string{
    if(this._location.path() != '') {
      this.url = this._location.path();
      this._listName = this.url.split('/')[3];
      return this._listName;
    }
  }

  getCardsList():void{
    this._cards = this._cardsListsService.getCards(this.getListName());
  }
  private ngOnDestroy() {
    this.sub.unsubscribe();


  }

  private displayQuestion():void{
    this._cardQuestion = this._studyOptions.frontFirst ? this._cards[this.index].front : this._cards[this.index].back;
    this.buttonShowAnswer = true;
    this._showAnswer = false;
  }

  private showAnswer():void{
    this._cardAnswer = this._studyOptions.frontFirst ? this._cards[this.index].back : this._cards[this.index].front;
    this.buttonShowAnswer = false;
    this.buttonsResults = true;
    this._showAnswer = true;
  }
  private removeCard():void{
    this._cards.splice(this.index,1);
  }

  private playCards():void {
    if (this._cards.length > 0)
    {
      if (this._studyOptions.random)
        this.index = this.nextCard();
      this.displayQuestion();
    }
  }
  private getRandom = function(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  private nextCard():number{
    return this.getRandom(this._cards.length - 1);
  }
  private resultsClicked(succeed:boolean):void{
    this.buttonsResults = false;
    if ((!this._studyOptions.repeatFails) || (succeed))
      this.removeCard();
    this.playCards();
    this._cardAnswer = this._cards.length > 0 ? '' : this._cardAnswer;
  }


}


