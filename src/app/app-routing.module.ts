import { HomeComponent } from './components/home/home.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';


const routes: Routes = [
  { path: '' , redirectTo: 'home' , pathMatch: 'full' },
  { path: 'events/:id' , component: ViewEventComponent },
  { path: 'login' , component: LoginComponent },
  { path: 'student-register' , component: StudentRegisterComponent },
  { path: 'home' , component: HomeComponent }
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
