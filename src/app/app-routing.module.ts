import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/homepage/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { EventPlannerLayoutComponent } from "./components/event-planner/event-planner-layout/event-planner-layout.component";
import { CreateEventComponent} from "./components/event-planner/create-event/create-event.component";
import { EventPlannerHomeComponent } from "./components/event-planner/event-planner-home/event-planner-home.component";


const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'event-planner' , component: EventPlannerLayoutComponent },
  { path: 'event-planner-home' , component: EventPlannerHomeComponent },

];

export const routingComponents = [ ViewEventComponent , HomeComponent ,EventPlannerLayoutComponent, CreateEventComponent,] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
