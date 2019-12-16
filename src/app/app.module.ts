
// Node Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { CardComponent } from './components/homepage/card/card.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { StudentRegisterComponent } from './components/login-signup/student-register/student-register.component';

import { CreateEventComponent } from "./components/event-planner/create-event/create-event.component";
import { FileDropUploadComponent } from "./components/event-planner/file-drop-upload/file-drop-upload.component";
import { FileUploaderComponent } from './components/event-planner/file-uploader/file-uploader.component';
import { EventProposalComponent } from './components/event-planner/event-proposal/event-proposal.component';
import { SponsorsComponent } from './components/event-planner/sponsors/sponsors.component';

// Services
import { EventDetailsService } from './services/event-details.service';
import { LoginRegisterService } from './services/login-register.service';
import { EventPlannerService } from "./services/event-planner.service";

//Directives
import { DragDropDirective } from "./directives/drag-drop.directive";

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

    CreateEventComponent,
    EventProposalComponent,
    FileUploaderComponent,
    FileDropUploadComponent,
    SponsorsComponent,

    DragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [EventDetailsService, LoginRegisterService,EventPlannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
