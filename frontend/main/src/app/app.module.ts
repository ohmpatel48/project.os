import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RrsimulComponent } from './pages/rrsimul/rrsimul.component';
import { HomeComponent } from './pages/home/home.component';
import { ScanComponent } from "./pages/scan/scan.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BankerComponent } from './pages/banker/banker.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DocComponent } from './pages/doc/doc.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { TryComponent } from './pages/try/try.component';





@NgModule({
  declarations: [
    AppComponent,
    RrsimulComponent,
    HomeComponent,
    ScanComponent,
    BankerComponent,
    NavbarComponent,
    DocComponent,
    DeveloperComponent,
    TryComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
