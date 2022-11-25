import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRouterModule } from './tasks.routing.module';
import { FilterByNamePipe } from './services/pipes/filter-by-name.pipe';
import { CoreModule } from './../core/core.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskComponent } from './task/task.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [
    TasksListComponent,
    TaskComponent,
    TaskEditComponent,
    FilterByNamePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule,
    TasksRouterModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TasksModule { }
