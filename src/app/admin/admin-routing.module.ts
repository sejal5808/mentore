import { Component, NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { ListComponent } from './list/list.component';
import { ParentComponent } from './parent/parent.component';
import { ChiledComponent } from './chiled/chiled.component';
import { SecondChildComponent } from './second-child/second-child.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

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
            {path:'parent',component:ParentComponent},
            {path:'child',component:ChiledComponent},
            {path:'child2',component:SecondChildComponent},
            {path:'reactiveform',component:ReactiveFormComponent}


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
