import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule , StorageBucket} from "@angular/fire/storage";
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';

import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardService } from './dashboard.service';
// import { EventProposalComponent } from './event-proposal/event-proposal.component';
// import { FileUploaderComponent } from './file-uploader/file-uploader.component';
//import { FileDropUploadComponent } from './file-drop-upload/file-drop-upload.component';
//import { DragDropDirective } from './drag-drop.directive';
//import { CreateEventComponent } from './create-event/create-event.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    //EventProposalComponent
    // FileUploaderComponent,
    //FileDropUploadComponent,
    //DragDropDirective,
    //CreateEventComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //HttpClientModule,
    SidebarModule,
    NavbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
