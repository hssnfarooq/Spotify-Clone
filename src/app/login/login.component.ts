/*
The component must have the following properties:
o user: (default value: {userName: "", password: "", _id: ""}) – NOTE: this is the data that is synced
to the form
o warning (default value: "")
o loading (default value: false)
• The component requires an instance of the "AuthService" and "Router" (from @angular/router)
• There is only one method implemented: onSubmit(), which must be invoked when the form in
login.component.html is submitted. This function must:
o First, ensure that user.userName and user.password are not blank ("")
o If this is the case, set loading to true and invoke the login method on the instance of
"AuthService" with the user object (defined as a property in the class) as its single parameter. Be
sure to subscribe to the returned Observable.
o If the Observable broadcasts that it was successful, then we must set:
▪ loading to false
▪ The "access_token" property in "localStorage" to the .token property of the success
message broadcast from the observable, ie: success.token
▪ Finally, use the "router" service ("Router") to navigate to the "/newReleases" route
o If the Observable broadcasts that there was an error, then we must set
▪ warning to the error message broadcast from the observable, ie: err.error.message
▪ loading to false
*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import User from '../User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { userName: '', password: '', _id: '' };
  warning: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.loading = true;
    this.warning = '';
    this.authService.login(this.user).subscribe(
      (success) => {
        this.loading = false;
        localStorage.setItem('access_token', success.token);
        this.router.navigate(['/newReleases']);
      },
      (err) => {
        this.loading = false;
        this.warning = err.error.message;
      }
    );
  }
}
