import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardService } from './Services/card.service';
import { CardsListsService } from './Services/cards-lists.service';
import { StudyOptionsService } from './Services/study-options.service';
import {AuthenticationService} from "./Services/authentication.service";
import { SelectedCardsListService } from './Services/selected-cards-list.service';
import { AppComponent } from './app.component';
import {routingComponents,AppRoutingModule} from './app.routing';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CardService,CardsListsService,StudyOptionsService,SelectedCardsListService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
