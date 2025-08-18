import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { ClaimListComponent } from './claim-list/claim-list.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: "My Insurance App"
    },
    {
        path: "plan/:id",
        component: PlanDetailsComponent,
        title: "My Insurance App"
    },
    {
        path: "claims/new",
        component: ClaimFormComponent,
        title: "My Insurance App"
    },
    {
        path: "claims",
        component: ClaimListComponent,
        title: "My Insurance App"
    }
];
