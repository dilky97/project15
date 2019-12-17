
// Node Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { CardComponent } from './components/homepage/card/card.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { RegisterComponent } from './components/login-signup/register/register.component';
import { TestComponent } from './components/test/test.component';

// Services
import { EventDetailsService } from './services/event-details.service';
import { LoginRegisterAuthService } from './services/login-register-auth.service';
import { UserDetailsService } from './services/user-details.service';

// Others
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    ViewEventComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [EventDetailsService, LoginRegisterAuthService, UserDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
