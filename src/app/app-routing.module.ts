import { HomeComponent } from './components/homepage/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { CreateEventComponent} from "./components/event-planner/create-event/create-event.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'eventplanner' , component: CreateEventComponent }

];

export const routingComponents = [ ViewEventComponent , HomeComponent ,CreateEventComponent] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
