import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardRoutes } from "./dashboard-layout.routing";

import { CreateEventComponent } from "../create-event/create-event.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DashboardRoutes)
    ],
    declarations: [
      CreateEventComponent
    ]
})

export class DashboardLayoutModule{}
