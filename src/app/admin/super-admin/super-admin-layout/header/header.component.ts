import { Component, OnInit } from '@angular/core';
import { GlobleService } from 'src/app/admin/admin-service/globle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public gs: GlobleService){}

  ngOnInit(): void {
    
  }

}
