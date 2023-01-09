import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
