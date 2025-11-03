import { Routes } from '@angular/router';
import { Plans } from './plans/plans';
import { Confirmation } from './confirmation/confirmation';
import { Aboutus } from './aboutus/aboutus';

import { Home } from './home/home';
export const routes: Routes = [
    {path: '', redirectTo: '/plans' , pathMatch: 'full'},    
    { path: 'plans', component: Plans },
    { path: 'confirmation/:id', component: Confirmation},
     { path: 'about', component: Aboutus },
     {path:'home' , component:Home}
];
