import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobleService } from '../../admin-service/globle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(public gs:GlobleService,public router:Router){}

}
