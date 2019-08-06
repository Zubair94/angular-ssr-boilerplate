import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
