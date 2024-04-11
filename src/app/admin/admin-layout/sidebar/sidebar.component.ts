import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../admin-service/api.service';
import { GlobleService } from '../../admin-service/globle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(public router: Router, public servide: GlobleService) {

  }

  logOut() {
    this.servide.swalFire().then((result: any) => {
      if (result.value) {
        localStorage.clear();
        this.router.navigate(['login']);
      }})
  }
}

