import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppMaterialModule} from "./app-material.module";
import {AppRoutingModule} from './app-routing.module';
import {UiModule} from "./ui/ui.module";
import {HttpClientModule} from "@angular/common/http";
import {NgxScannerQrcodeModule} from "ngx-scanner-qrcode";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppMaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        UiModule,
        HttpClientModule,
        NgxScannerQrcodeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
