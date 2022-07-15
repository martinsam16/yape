import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


// Components
import {HomeComponent} from './home/home.component';
import {TransactionComponent} from './transaction/transaction.component';
import {ErrorComponent} from './error/error.component';
import {AppMaterialModule} from "../app-material.module";

// Routing
import {UiRoute} from "./ui.routes";
import {RouterModule} from "@angular/router";

// Services
import {ContractService} from "../services/contract/contract.service";
import { QrComponent } from './qr/qr.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

@NgModule({
    declarations: [
        HomeComponent,
        TransactionComponent,
        ErrorComponent,
        QrComponent,
        QrScannerComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UiRoute),
        AppMaterialModule,
        ReactiveFormsModule,
        ClipboardModule,
        NgxScannerQrcodeModule,
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        ContractService,
    ],
})
export class UiModule {
}
