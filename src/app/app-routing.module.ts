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
import { CreateClubComponent } from './components/student-dashbord/create-club/create-club.component';


const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'test' , component: TestComponent, canActivate: [RouteGuardService], data: {role: 'eventPlanner'}},
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'student-dashboard' , component: StudentHomeComponent, canActivate: [RouteGuardService], data: {role: 'student'}},
  { path: 'no-access' , component: NoAccessComponent },
  { path: 'create-club' , component: CreateClubComponent },
  {path:'serviceprovider-dashboard' ,component:ServiceproviderHomeComponent},


  { path: 'event-planner' , component: EventPlannerLayoutComponent },
  { path: 'event-planner-home' , component: EventPlannerHomeComponent },
];

export const routingComponents = [ ViewEventComponent , HomeComponent , EventPlannerLayoutComponent, CreateEventComponent ] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
