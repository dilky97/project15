import { HomeComponent } from './components/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { RegisterComponent } from './components/register/register.component';
import { SponsorRegisterComponent } from './components/sponsor-register/sponsor-register.component';
import { ServiceProviderRegisterComponent } from './components/service-provider-register/service-provider-register.component';


const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'student-register' , component: StudentRegisterComponent },
  { path: 'sponsor-register' , component: SponsorRegisterComponent },
  { path: 'service-provider-register' , component: ServiceProviderRegisterComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'events/:id' , component: ViewEventComponent },
];

export const routingComponents = [
                                    ViewEventComponent,
                                    HomeComponent,
                                    LoginComponent,
                                    StudentRegisterComponent
                                 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
