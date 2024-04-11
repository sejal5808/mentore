import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicetestService } from '../../services/servicetest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(public servise:ServicetestService,public router:Router){}
ngOnInit(){
}
   logout() {
          localStorage.clear();
          this.servise.loginData = {};
          this.router.navigate(['/login']);
       }
}
