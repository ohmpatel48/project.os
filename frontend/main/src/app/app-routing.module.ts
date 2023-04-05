import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FriComponent } from './pages/fri/fri.component';
// import { BankerComponent } from './pages/banker/banker.component';
import { HomepgComponent } from './pages/homepg/homepg.component';
import { Page2Component } from './pages/page2/page2.component';
import { Rralgopg1Component } from './pages/rralgopg1/rralgopg1.component';
import { Rralgopg2Component } from './pages/rralgopg2/rralgopg2.component';
import { Bankpg2Component } from './pages/bankpg2/bankpg2.component';
import { Bankpg1Component } from './pages/bankpg1/bankpg1.component';
import { Scanpg1Component } from './pages/scanpg1/scanpg1.component';
import { Scanpg2Component } from './pages/scanpg2/scanpg2.component';
import { Mrupg1Component } from './pages/mrupg1/mrupg1.component';
import { Marupg2Component } from './pages/marupg2/marupg2.component';
// import { BackgroundComponent } from './component/background/background.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

const routes: Routes = [
  
  { 
    path: '', 
    component: HomepgComponent,  
    pathMatch: 'full' 
  }, 
  
  { 
    path: 'Home/Simulators', 
    component: Page2Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/RRAlgo', 
    component: Rralgopg1Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/BankersAlgo', 
    component: Bankpg1Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/SCanAlgo', 
    component: Scanpg1Component, 
    pathMatch: 'full' 
  },
  
  { 
    path: 'Home/Simulators/MRUAlgo', 
    component: Mrupg1Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/RRAlgo/RRSimulator', 
    component: Rralgopg2Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/BankersAlgo/BankerSimulator', 
    component: Bankpg2Component, 
    pathMatch: 'full' 
  },

  { 
    path: 'Home/Simulators/SCanAlgo/SCanSimulator', 
    component: Scanpg2Component, 
    pathMatch: 'full' 
  },
  
  { 
    path: 'Home/Simulators/MRUAlgo/MRUSimulator', 
    component: Marupg2Component, 
    pathMatch: 'full' 
  },

  {
    path: 'Home/Aboutus',
    component: AboutusComponent,
    pathMatch: 'full'
  }

  ];
// const routes: Routes = [{ path: 'banker', component: BankerComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
