import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { DashboardService } from '../dashboard.service';

import { DashboardRoutes } from "./dashboard-layout.routing";

import { CreateEventComponent } from "../create-event/create-event.component";
import { FileDropUploadComponent } from "../file-drop-upload/file-drop-upload.component";
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { EventProposalComponent } from '../event-proposal/event-proposal.component';
import { DragDropDirective } from '../drag-drop.directive';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DashboardRoutes),
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      AngularFireDatabaseModule,
      AngularFirestoreModule,
      AngularFireStorageModule
    ],
    declarations: [
      CreateEventComponent,
      FileDropUploadComponent,
      FileUploaderComponent,
      EventProposalComponent,
      DragDropDirective
    ],
    providers: [DashboardService]
})

export class DashboardLayoutModule{}
