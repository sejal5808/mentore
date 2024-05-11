import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
        { path: '', redirectTo: 'super-admin', pathMatch: 'full' },
        { path: 'super-admin', component: SuperAdminComponent },
 ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
