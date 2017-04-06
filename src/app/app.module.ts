import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardService } from './Services/card.service';
import { CardsListsService } from './Services/cards-lists.service';
import { StudyOptionsService } from './Services/study-options.service';
import { SelectedCardsListService } from './Services/selected-cards-list.service';
import { AppComponent } from './app.component';
import {routingComponents,AppRoutingModule} from './app.routing';
import { AddCardsComponent } from './Lists/add-cards/add-cards.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AddCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CardService,CardsListsService,StudyOptionsService,SelectedCardsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
