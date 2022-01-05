import {Routes} from '@angular/router';

// Components
import {ErrorComponent} from "./error/error.component";
import {HomeComponent} from "./home/home.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {QrComponent} from "./qr/qr.component";

export const UiRoute: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'transaction', component: TransactionComponent},
    {path: 'home', component: HomeComponent},
    {path: '404', component: ErrorComponent},
    {path: 'my-qr', component: QrComponent},
    {path: '**', redirectTo: '/404'},
];
