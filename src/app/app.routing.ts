/**
 * Created by inbal on 3/18/2017.
 */
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {StudyListsComponent} from "./Study/study-lists/study-lists.component";
import {CardsListComponent} from "./Lists/cards-list/cards-list.component";
import {AddCardsComponent} from "./Lists/add-cards/add-cards.component";
import {CardService} from "./Services/card.service";
import {CardsListsService} from "./Services/cards-lists.service";
import {StudyOptionsComponent} from "./Study/study-options/study-options.component";
import { StudyWordsComponent } from './Study/study-words/study-words.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import {Guard} from "./Services/auto.guard";
import {LogoutComponent} from "./logout/logout/logout.component";

import {UserService} from "./Services/user.service";


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
    //,canActivate: [Guard]
  },
  {
    path:'logout',
    component: LogoutComponent
  },
  {
    path:'home',
    component: HomePageComponent
  },
  {
    path: 'cards_lists',
    component: CardsListComponent,
    canActivate: [Guard],
    children: [
      {
        path:'list/:name',
        component: AddCardsComponent
      }
    ]
  },
  {
    path: 'study_lists',
    component: StudyListsComponent,
    canActivate: [Guard],
    children: [
      {
        path:'list/:name',
        component: StudyOptionsComponent,
        children: [
          {
            path:'study',
            component: StudyWordsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [
    CardService,
    CardsListsService,
    UserService
  ]
})
export class AppRoutingModule { }
export const routingComponents = [LogoutComponent,HomePageComponent,LoginComponent,CardsListComponent,StudyListsComponent,StudyOptionsComponent,StudyWordsComponent,AddCardsComponent];
