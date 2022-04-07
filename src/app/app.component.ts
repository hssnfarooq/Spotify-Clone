/*********************************************************************************
 * WEB422 – Assignment 05
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
 * assignment has been copied manually or electronically from any other source (including web sites) or
 * distributed to other students.
 *
 * Name: Armin Sadeghzadeh      Student ID: 118291194     Date: 23/03/2022
 *
 ********************************************************************************/
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   searchString: string = '';
//   title = 'web422-a4';

//   constructor(private router: Router) {}

//   handleSearch() {
//     this.router.navigate(['/search'], {
//       queryParams: { q: this.searchString },
//     });
//     this.searchString = '';
//   }
// }

/*
Modify the class definition for AppComponent such that it "implements OnInit"
• add a "token" property
• Inject both the Router (from @angular/router) and AuthService (from ./auth.service) in the constructor
• When the component is initialized (ie: ngOnInit), subscribe to router.events (from @angular/router) and
when navigation starts (ie: event instanceof NavigationStart) use the AuthService to read the token from
localStorage (using .readToken()) and assign the token to our newly created "token" property.
NOTE: This process is identical to the "Update the ngOnInit() Method" step towards the end of the Week
11 Notes
• Add a logout() method that:
o clears out local storage, ie: localStorage.clear();
o uses the injected Router instance to navigate to "/login"
*/
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public token: any;
  searchString: string = '';
  title = 'web422-a4';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
