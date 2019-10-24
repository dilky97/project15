import { Routes } from '@angular/router';

import { CreateEventComponent } from '../create-event/create-event.component';

export const DashboardRoutes: Routes = [
    {path: 'create_event',     component:CreateEventComponent}
];