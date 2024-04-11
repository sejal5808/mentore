import { Component } from '@angular/core';
import { GlobleService } from '../admin-service/globle.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(public gs:GlobleService ){}

    ngOnInit():void {
      this.gs.loginData = JSON.parse(localStorage.getItem('userlogin') || '{}')

      
    }
}

