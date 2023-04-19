import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepgComponent } from './pages/homepg/homepg.component';
import { Page2Component } from './pages/page2/page2.component';
import { Rralgopg1Component } from './pages/rralgopg1/rralgopg1.component';
import { Bankpg1Component } from './pages/bankpg1/bankpg1.component';
import { Scanpg1Component } from './pages/scanpg1/scanpg1.component';
import { Mrupg1Component } from './pages/mrupg1/mrupg1.component';
import { Bankpg2Component } from './pages/bankpg2/bankpg2.component';
import { Scanpg2Component } from './pages/scanpg2/scanpg2.component';
import { Marupg2Component } from './pages/marupg2/marupg2.component';
import { Rralgopg2Component } from './pages/rralgopg2/rralgopg2.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { BackgroundComponent } from './component/background/background.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { FormsModule } from '@angular/forms';
import { SetdatarrService } from './service/setdataarr.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomepgComponent,
    Page2Component,
    Rralgopg1Component,
    Bankpg1Component,
    Scanpg1Component,
    Mrupg1Component,
    Bankpg2Component,
    Scanpg2Component,
    Marupg2Component,
    Rralgopg2Component,
    NavbarComponent,
    BackgroundComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [SetdatarrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
