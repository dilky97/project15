import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './navbar/navbar.module';

import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
// import { CreateEventComponent } from './create-event/create-event.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent
    // CreateEventComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
