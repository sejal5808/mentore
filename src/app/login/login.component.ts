import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServicetestService } from '../pages/services/servicetest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userData: any = {
    email: '',
    password: ''

  }
  passwordType:any = 'password';
  showPassOption: boolean = true;
  loginData: any;
  token:any;
  constructor(public service: ServicetestService,public router:Router) {

  }


  login(form: any) {
    if (form.valid) {
      this.service.postApi(form.value, 'login').then((res: any) => {
        if (res && res['status']) {
          localStorage.setItem('token', JSON.stringify(res['token'] || '""'));
          localStorage.setItem('userlogin', JSON.stringify(res.data || {}));
          this.service.loginData = JSON.parse(localStorage.getItem('userlogin') || '{}');
          console.log(" this.service.loginData", this.service.loginData)
          this.token = JSON.parse(localStorage.getItem('token') || '""');
          console.log("123",this.token.length)
          this.router.navigate(["/home"]);
          console.log(">>>>>>")
          this.service.toaster("success", res.message);
        }
        else {
          this.service.toaster("error", res.message)

        }
      }, _err => {
        console.log("Error:", _err);
      });
    }
    else {
      this.service.toaster('error', 'Please fill all required fields')
    }
  }

  changePassType() {
    this.showPassOption = !this.showPassOption;
    if (this.passwordType === "password") {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password'
    }
  }
}
