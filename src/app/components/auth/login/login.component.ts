import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: ``,
    password: ``
  }

  constructor(
    private service: UserAuthService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.user)
    if (!this.user.email || !this.user.password) {
      this.helperService.alertFailure(`Invalid`, `Please enter user name and password`);
    } else {
      // this.helperService.alertSuccess(`Success`, `Login Successfully`)
      this._login();
    }
  }

  _login(): void {
    const data = this.user;
    this.service.login(data)
      .subscribe(response => {
        console.log(response);
      }, (error => {
        console.log(error);
        if (error.status === 400) {
          this.helperService.alertFailure(`Error`, error.error.message[0].message);
        } else if (error.status === 500) {
          this.helperService.alertFailure(`Error`, `Something went wrong!`);
        }
      }))
  }
}
