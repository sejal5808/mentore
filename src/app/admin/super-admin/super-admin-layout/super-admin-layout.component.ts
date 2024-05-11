import { Component } from '@angular/core';
import { GlobleService } from '../../admin-service/globle.service';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.component.html',
  styleUrls: ['./super-admin-layout.component.scss']
})
export class SuperAdminLayoutComponent {

  constructor(public gs: GlobleService){}

}
