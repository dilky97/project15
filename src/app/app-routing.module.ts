import { HomeComponent } from './components/homepage/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login-signup/login/login.component';
import { RegisterComponent } from './components/login-signup/register/register.component';
import { TestComponent } from './components/test/test.component';
import { RouteGuardService } from './route-guard.service';
import { StudentHomeComponent } from './components/student-dashbord/student-home/student-home.component';

import { EventPlannerLayoutComponent } from './components/event-planner/event-planner-layout/event-planner-layout.component';
import { CreateEventComponent} from './components/event-planner/create-event/create-event.component';
import { EventPlannerHomeComponent } from './components/event-planner/event-planner-home/event-planner-home.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { CreateClubComponent } from './components/student-dashbord/create-club/create-club.component';
import { EventsListComponent } from './components/event-planner/events-list/events-list.component';
import { AdvisorHomeComponent } from './components/advisor-dashbord/advisor-home/advisor-home.component';
import { StudentEditComponent } from './components/student-dashbord/student-edit/student-edit.component';
import { AdvisorEditComponent } from './components/advisor-dashbord/advisor-edit/advisor-edit.component';


const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'test' , component: TestComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'student-dashboard' , component: StudentHomeComponent, canActivate: [RouteGuardService], data: {role: 'student'}},
  { path: 'advisor-dashboard' , component: AdvisorHomeComponent, canActivate: [RouteGuardService], data: {role: 'advisor'}},
  { path: 'student-update' , component: StudentEditComponent, canActivate: [RouteGuardService], data: {role: 'student'}},
  { path: 'advisor-update' , component: AdvisorEditComponent, canActivate: [RouteGuardService], data: {role: 'advisor'}},
  { path: 'no-access' , component: NoAccessComponent },

  { path: 'event-planner-home/:id' , component: EventPlannerHomeComponent, canActivate: [RouteGuardService], data: {role: 'student'},
   children:[

    {
      path: '',
      redirectTo : 'all-events',
      pathMatch : 'full'

    },
    {
      path : 'all-events',
      component: EventsListComponent
    },

    {
      path: 'create-event' ,
      component: CreateEventComponent
    },

   {
     path: 'event/:eventId',
     component: EventPlannerLayoutComponent
   },


  ]},

  { path: 'create-club' , component: CreateClubComponent, canActivate: [RouteGuardService], data: {role: 'student'} },

  { path: 'event-planner' , component: EventPlannerLayoutComponent },
  { path: 'event-planner-home' , component: EventPlannerHomeComponent },
];

export const routingComponents = [ ViewEventComponent , HomeComponent , EventPlannerLayoutComponent, CreateEventComponent ] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
