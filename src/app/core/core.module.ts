import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  exports: [HeaderComponent, SpinnerComponent]
})
export class CoreModule { }
