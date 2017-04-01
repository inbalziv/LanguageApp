import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardsListsService} from '../../Services/cards-lists.service';
import { StudyOptionsService } from '../../Services/study-options.service';
import {StudyOptions} from '../../Interfaces/study-options';


@Component({
  selector: 'app-study-options',
  providers: [CardsListsService,StudyOptionsService],
  templateUrl: './study-options.component.html',
  styleUrls: ['./study-options.component.css']
})
export class StudyOptionsComponent implements OnInit {
  name: any;
  sub: any;
  _studyOptions:StudyOptions;

  constructor(private activatedRoute: ActivatedRoute,private _studyOptionsService:StudyOptionsService)  {

  }
  private isOn: boolean = false;
  ngOnInit() {
    this.getListName();
    this.getOptions();

    this.sub = this.activatedRoute.params.subscribe(params => this.name = params['name']);
  }
  getListName():string{
    return this.name;
  }
  private ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getOptions():void{
    this._studyOptions = this._studyOptionsService.getStudyOptions();

  }
  setState():void{
    this.isOn = !this.isOn;
  }
  onSubmit():void{
    this.setOptions();
  }
  setOptions():void{
    this._studyOptionsService.setStudyOptions(this._studyOptions.random, this._studyOptions.repeatFails , this._studyOptions.frontFirst);
  }
}
