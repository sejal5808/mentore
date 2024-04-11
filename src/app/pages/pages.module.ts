import { NgModule} from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './front-layout/header/header.component';
import { FooterComponent } from './front-layout/footer/footer.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { EventComponent } from './event/event.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FrontLayoutComponent,
    AboutComponent,
    CoursesComponent,
    EventComponent,
    MyProfileComponent,
    TrainerComponent,
    ContactComponent,
    ChatComponent



  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    HttpClientModule

  ]
})
export class PagesModule { }
