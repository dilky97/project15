
// Node Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
                               // from dilky
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { CardComponent } from './components/homepage/card/card.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { LoginComponent } from './components/login-signup/login/login.component';
                               // from dilky
import { EventPlannerLayoutComponent } from './components/event-planner/event-planner-layout/event-planner-layout.component';
import { CreateEventComponent } from './components/event-planner/create-event/create-event.component';
import { FileDropUploadComponent } from './components/event-planner/file-drop-upload/file-drop-upload.component';
import { FileUploaderComponent } from './components/event-planner/file-uploader/file-uploader.component';
import { EventProposalComponent } from './components/event-planner/event-proposal/event-proposal.component';
import { SponsorsComponent } from './components/event-planner/sponsors/sponsors.component';
import { EventPlannerHomeComponent } from './components/event-planner/event-planner-home/event-planner-home.component';
import { EventCardComponent } from './components/event-planner/event-card/event-card.component';
import { RegisterComponent } from './components/login-signup/register/register.component';
import { TestComponent } from './components/test/test.component';
import { StudentRegisterComponent } from './components/login-signup/student-register/student-register.component';
import { NewSponsorComponent } from './components/sponsor/new-sponsor/new-sponsor.component';

// Services
import { EventDetailsService } from './services/event-details.service';
import { LoginRegisterAuthService } from './services/login-register-auth.service';
import { UserDetailsService } from './services/user-details.service';
import { RouteGuardService } from './route-guard.service';
                              // from dilky
import { EventPlannerService } from './services/event-planner.service';


// Directives
                            // from dilky
import { DragDropDirective } from './directives/drag-drop.directive';

// Others
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
                            // from dilky
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentHomeComponent } from './components/student-dashbord/student-home/student-home.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { StudentEventCardComponent } from './components/student-dashbord/student-event-card/student-event-card.component';

import { CreateClubComponent } from './components/student-dashbord/create-club/create-club.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsorListComponent } from './components/sponsor/sponsor-list/sponsor-list/sponsor-list.component';
import { SponsorService } from './services/sponsor.service';

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
    EventPlannerLayoutComponent,
    CreateEventComponent,
    EventProposalComponent,
    FileUploaderComponent,
    FileDropUploadComponent,
    SponsorsComponent,
    EventPlannerHomeComponent,
    EventCardComponent,
    DragDropDirective,
    StudentHomeComponent,
    NoAccessComponent,
    CreateClubComponent
    StudentEventCardComponent
    StudentRegisterComponent,
    NewSponsorComponent,
    SponsorListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [EventDetailsService, LoginRegisterAuthService, UserDetailsService, RouteGuardService, EventPlannerService,SponsorService],

  bootstrap: [AppComponent]
})
export class AppModule { }
