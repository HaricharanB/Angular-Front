import { Routes } from '@angular/router';
import { Plans } from './plans/plans';
import { Confirmation } from './confirmation/confirmation';
export const routes: Routes = [
    {path: '', redirectTo: '/plans' , pathMatch: 'full'},    
    { path: 'plans', component: Plans },
    { path: 'confirmation/:id', component: Confirmation}
];
