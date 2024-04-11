import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userData: any = {
    username: '',
    phone: '',
    email: '',
    password: '',
  }
  showPassOption: boolean = true;
  passwordType: any = 'password';
  constructor(public service: ServicetestService, public router: Router) {

  }


  register(form: any) {
    if (form.valid) {
      console.log("data", form)
      this.service.postApi(form.value, 'register').then((_res: any) => {
        if (_res && _res['status']) {
          this.service.toaster("success", _res.message);
          this.router.navigate(["home"]);

        }
        else {
          this.service.toaster('error', _res.message)
        }
      }, _err => {
        console.log("Error:", _err);
      });
    }
    else {
      this.service.toaster('error', 'please fill all requried feilds ')
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