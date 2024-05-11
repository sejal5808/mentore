import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule  } from '@angular/common';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {  LightboxModule } from 'ngx-lightbox';
import { NgxSummernoteModule } from 'ngx-summernote';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard]},
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: 'register', component: RegisterComponent },
  {path:'',loadChildren: () => import('./pages/pages.module').then((m)=> m.PagesModule),canActivateChild:[AuthGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),canActivateChild:[AuthGuard]
  },
  {
    path:'super-admin',
    loadChildren:() => import('./admin/super-admin/super-admin.module').then((m)=> m.SuperAdminModule)
  }

];

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    LightboxModule,
    NgxSummernoteModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true },)

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
