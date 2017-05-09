import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardService } from './Services/card.service';
import { CardsListsService } from './Services/cards-lists.service';
import { StudyOptionsService } from './Services/study-options.service';
import { Guard } from './Services/auto.guard';
import { UserService } from './Services/user.service';
import {LoginService} from "./Services/login.service";
import { SelectedCardsListService } from './Services/selected-cards-list.service';
import { AppComponent } from './app.component';
import {routingComponents,AppRoutingModule} from './app.routing';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogoutComponent } from './logout/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [Guard,UserService,LoginService,CardService,CardsListsService,StudyOptionsService,SelectedCardsListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
