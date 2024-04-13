import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//  ####### Modules #######
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberonlyDirective } from '../numberonly.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LightboxModule } from 'ngx-lightbox';
import { ChiledComponent } from '../admin/chiled/chiled.component';
import { TableComponent } from './table/table.component';


// ####### Directive/pipes #######


@NgModule({

  declarations: [
NumberonlyDirective,
TableComponent  ],
  imports: [
    CommonModule,
    NgxSummernoteModule,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    LightboxModule,
    NgxSummernoteModule,
    CommonModule,

    
  ],
  exports:[
    CommonModule,
    NgxSummernoteModule,
    NumberonlyDirective,
    FormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    LightboxModule,
    NgxSummernoteModule,
    CommonModule,
    TableComponent


  ],
  providers: [],
})
export class SharedModule { }
