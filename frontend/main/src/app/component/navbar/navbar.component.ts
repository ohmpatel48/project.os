import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // urlSegments = this.route.snapshot.url;
  currentUrl:any = this.loc.path();
  constructor(private loc: Location,private router: Router) {}
  goBack() {
    this.currentUrl = this.loc.path();
    if (this.currentUrl === '/Home/Simulators' || this.currentUrl === '/Home/Aboutus') {
      this.router.navigate(['/']);
    }else if (this.currentUrl === '/Home/Simulators/RRAlgo'||this.currentUrl === '/Home/Simulators/BankersAlgo'||this.currentUrl === '/Home/Simulators/SCanAlgo'||this.currentUrl === '/Home/Simulators/MRUAlgo') {
      this.router.navigate(['/Home/Simulators']); 
    } else if (this.currentUrl === '/Home/Simulators/RRAlgo/RRSimulator') {
      this.router.navigate(['/Home/Simulators/RRAlgo']);
    }else if (this.currentUrl === '/Home/Simulators/BankersAlgo/BankerSimulator') {
      this.router.navigate(['/Home/Simulators/BankersAlgo']);
    }else if (this.currentUrl === '/Home/Simulators/MRUAlgo/MRUSimulator') {
      this.router.navigate(['/Home/Simulators/MRUAlgo']);
    } else if (this.currentUrl === '/Home/Simulators/SCanAlgo/SCanSimulator') {
      this.router.navigate(['/Home/Simulators/SCanAlgo']);
    }
    else {
      
    }
  }
  showBackButton() {
    // Check if the current route is not the home page route
    return this.router.url !== '/';
  }
}
