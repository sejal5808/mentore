import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { EventComponent } from './event/event.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
    {
        path: '', component: FrontLayoutComponent,
        children: [
          { path: "", redirectTo: 'home', pathMatch: 'full' },
          { path: "contact", component: ContactComponent },
          { path: "about", component: AboutComponent },
          { path: "courses", component: CoursesComponent },
          { path: 'trainer', component: TrainerComponent },
          { path: 'home', component: HomeComponent },
          { path: 'event', component: EventComponent },
          { path: 'my-Profile', component: MyProfileComponent },
          {path:'chat',component:ChatComponent}

    
        ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
