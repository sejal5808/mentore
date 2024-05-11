import { Component, Renderer2 } from '@angular/core';
import { GlobleService } from '../../admin-service/globle.service';

@Component({
  selector: 'app-super-admin-layout',
  templateUrl: './super-admin-layout.component.html',
  styleUrls: ['./super-admin-layout.component.scss']
})
export class SuperAdminLayoutComponent {

  constructor(public gs: GlobleService,
              private renderer: Renderer2,
  ){}

  sidebarExpand(event:any){
    if(!this.gs.isSidebarOpen){
      this.renderer.removeClass(event.currentTarget, 'sidebar-collapsed');
    }
  }

  sidebarCollapsed(event:any){
    if(!this.gs.isSidebarOpen){
      this.renderer.addClass(event.currentTarget, 'sidebar-collapsed');
    }
  }

}
