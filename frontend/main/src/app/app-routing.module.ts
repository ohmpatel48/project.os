import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RrsimulComponent } from './pages/rrsimul/rrsimul.component';
import { HomeComponent } from './pages/home/home.component';
import { ScanComponent } from "./pages/scan/scan.component";
import {BankerComponent} from "./pages/banker/banker.component";
import { DocComponent } from './pages/doc/doc.component';
import { DeveloperComponent } from './pages/developer/developer.component';


const routes: Routes = [
  {
    path: 'rrsimul',
    component: RrsimulComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'scan',
    component: ScanComponent,
    pathMatch: 'full',
  },
  {
    path: 'banker',
    component: BankerComponent,
    pathMatch: 'full',
  },
  {
    path: 'doc',
    component: DocComponent,
    pathMatch: 'full',
  },
  {
    path: 'developer',
    component: DeveloperComponent,
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
