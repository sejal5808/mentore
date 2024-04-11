import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'Add-Event', component: AddEventComponent },
            { path: 'Add-trainer', component: AddTrainerComponent },
            { path: "Add-course", component: ListComponent },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
