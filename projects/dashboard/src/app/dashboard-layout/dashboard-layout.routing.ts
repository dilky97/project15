import { Routes } from '@angular/router';

import { CreateEventComponent } from '../create-event/create-event.component';
import { EventProposalComponent } from '../event-proposal/event-proposal.component';

export const DashboardRoutes: Routes = [
    {path: 'create_event',     component:CreateEventComponent},
    {path: 'event_proposal',   component:EventProposalComponent}

];