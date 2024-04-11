import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//  ####### Modules #######
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberonlyDirective } from '../numberonly.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LightboxModule } from 'ngx-lightbox';


// ####### Directive/pipes #######


@NgModule({

  declarations: [
NumberonlyDirective  ],
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



  ],
  providers: [],
})
export class SharedModule { }
