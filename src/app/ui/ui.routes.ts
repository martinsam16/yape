import {Routes} from '@angular/router';

import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";

export const UiRoute: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: '404', component: ErrorComponent},
    {path: '**', redirectTo: '/404'},
];
