import { Injectable } from '@angular/core';
import {StudyOptions} from "../Interfaces/study-options";
import {STUDY_OPTIONS} from './Mocks/study-options-mock';

@Injectable()
export class StudyOptionsService {
  _studyOptionObject: StudyOptions = STUDY_OPTIONS;

  constructor() {}
  init():void{
    this._studyOptionObject.random = false;
    this._studyOptionObject.repeatFails = false;
    this._studyOptionObject.frontFirst = false;
  }
  setStudyOptions(random: boolean, repeatFails: boolean , frontFirst: boolean):void {
    this._studyOptionObject.random = random;
    this._studyOptionObject.repeatFails = repeatFails;
    this._studyOptionObject.frontFirst = frontFirst;

  }
  getStudyOptions():StudyOptions{
    return this._studyOptionObject;
  }

}
