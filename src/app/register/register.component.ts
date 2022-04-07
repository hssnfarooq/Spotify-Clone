import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = { userName: '', password: '', password2: '' };
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (
      this.registerUser.userName === '' ||
      this.registerUser.password === '' ||
      this.registerUser.password2 === ''
    ) {
      this.warning = 'Please fill in all fields';
      this.success = false;
      this.loading = false;
    } else {
      console.log(this.registerUser);
      this.loading = true;
      this.authService.register(this.registerUser).subscribe(
        (data) => {
          this.success = true;
          this.warning = '';
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
