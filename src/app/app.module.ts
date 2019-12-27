
// Node Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { CardComponent } from './components/homepage/card/card.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { StudentRegisterComponent } from './components/login-signup/student-register/student-register.component';
import { NewSponsorComponent } from './components/sponsor/new-sponsor/new-sponsor.component';
// Services
import { EventDetailsService } from './services/event-details.service';
import { LoginRegisterService } from './services/login-register.service';

// Others
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list/sponsor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ViewEventComponent,
    routingComponents,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    CardComponent,
    LoginComponent,
    StudentRegisterComponent,
    NewSponsorComponent,
    SponsorListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EventDetailsService, LoginRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
