import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';
import { HeaderComponent } from './super-admin-layout/header/header.component';
import { SidebarComponent } from './super-admin-layout/sidebar/sidebar.component';
import { FooterComponent } from './super-admin-layout/footer/footer.component';


@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperAdminLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
