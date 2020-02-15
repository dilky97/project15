import { HomeComponent } from './components/homepage/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login-signup/login/login.component';
import { RegisterComponent } from './components/login-signup/register/register.component';
import { TestComponent } from './components/test/test.component';
import { RouteGuardService } from './route-guard.service';
import { StudentHomeComponent } from './components/student-dashbord/student-home/student-home.component';
import {ServiceproviderHomeComponent} from './components/serviceprovider-dashboard/serviceprovider-home/serviceprovider-home.component';
import { EventPlannerLayoutComponent } from './components/event-planner/event-planner-layout/event-planner-layout.component';
import { CreateEventComponent} from './components/event-planner/create-event/create-event.component';
import { EventPlannerHomeComponent } from './components/event-planner/event-planner-home/event-planner-home.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { EditSponsorComponent } from './components/sponsor/edit-sponsor/edit-sponsor.component';
import { SponsorDashboardComponent } from './components/sponsor/sponsor-dashboard/sponsor-dashboard.component';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list/sponsor-list.component';
import { NewSponsorComponent } from './components/sponsor/new-sponsor/new-sponsor.component';
import { CreateClubComponent } from './components/student-dashbord/create-club/create-club.component';
import{ EditServiceproviderComponent } from './components/service-provider/edit-serviceprovider/edit-serviceprovider.component';
import { ServiceproviderListComponent } from './components/service-provider/serviceprovider-list/serviceprovider-list.component';
import{ ViewspComponent} from './components/service-provider/viewsp/viewsp.component';
import { EventsListComponent } from './components/event-planner/events-list/events-list.component';
import { AdvisorHomeComponent } from './components/advisor-dashbord/advisor-home/advisor-home.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'test' , component: TestComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'student-dashboard' , component: StudentHomeComponent, canActivate: [RouteGuardService], data: {role: 'student'}},
  { path: 'advisor-dashboard' , component: AdvisorHomeComponent, canActivate: [RouteGuardService], data: {role: 'advisor'}},
  { path: 'no-access' , component: NoAccessComponent },
  { path: 'sponsor-dashboard' ,component:SponsorDashboardComponent},
  { path: 'search' ,component:SearchComponent},

  { path: 'event-planner-home/:id' , component: EventPlannerHomeComponent,canActivate: [RouteGuardService], data: {role: 'student'},
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
     component:EventPlannerLayoutComponent
   },


  ]},

  { path: 'create-club' , component: CreateClubComponent },
  {path:'serviceProvider-dashboard' ,component:ServiceproviderHomeComponent,canActivate: [RouteGuardService], data: {role: 'serviceProvider'}},
  {path:'Edit-serviceprovider',component:EditServiceproviderComponent},

  { path: 'event-planner' , component: EventPlannerLayoutComponent },
  { path: 'event-planner-home' , component: EventPlannerHomeComponent },
  { path:'splist' , component:ServiceproviderListComponent},
  { path:'viewsp',component:ViewspComponent},
  { path: 'edit-sponsor', component: EditSponsorComponent },
  { path: 'sponsor-list', component:SponsorListComponent },
  { path : 'new-sponsor', component:NewSponsorComponent}
];

export const routingComponents = [ ViewEventComponent , HomeComponent ,EventPlannerLayoutComponent, CreateEventComponent, EditSponsorComponent ] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
