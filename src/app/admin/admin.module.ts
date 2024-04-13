import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { ListComponent } from './list/list.component';
import { AddEventComponent } from './add-event/add-event.component';
import { SharedModule } from '../shared/shared.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ApiService } from './admin-service/api.service';
import { ParentComponent } from './parent/parent.component';
import { ChiledComponent } from './chiled/chiled.component';
import { SecondChildComponent } from './second-child/second-child.component';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    AdminLayoutComponent,
    HeaderComponent,
    AddEventComponent,
    AddTrainerComponent,
    ListComponent,
    ParentComponent,
    ChiledComponent,
    SecondChildComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [ApiService],
})
export class AdminModule { }
