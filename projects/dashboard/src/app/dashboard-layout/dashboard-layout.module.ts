import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { DashboardService } from '../dashboard.service';

import { DashboardRoutes } from "./dashboard-layout.routing";

import { CreateEventComponent } from "../create-event/create-event.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DashboardRoutes),
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ],
    declarations: [
      CreateEventComponent
    ],
    providers: [DashboardService]
})

export class DashboardLayoutModule{}
