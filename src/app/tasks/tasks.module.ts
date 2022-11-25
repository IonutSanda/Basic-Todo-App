import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByNamePipe } from './../shared/filter-by-name.pipe';
import { TasksRouterModule } from './tasks.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    BrowserModule,
    TasksRouterModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ]
})
export class TasksModule { }
