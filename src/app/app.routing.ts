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

const routes: Routes = [
  {
    path: 'cards_lists',
    component: CardsListComponent,
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
    CardsListsService
  ]
})
export class AppRoutingModule { }
export const routingComponents = [CardsListComponent,StudyListsComponent,StudyOptionsComponent,StudyWordsComponent];
