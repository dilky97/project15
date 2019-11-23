
// Node Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { LoginComponent } from './components/login/login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';

// Services
import { EventDetailsService } from './services/event-details.service';
import { LoginRegisterService } from './services/login-register.service';

// Others
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { environment } from 'src/environments/environment';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [EventDetailsService, LoginRegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
