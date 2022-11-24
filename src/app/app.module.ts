import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByNamePipe } from './shared/filter-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksListComponent,
    TaskComponent,
    TaskEditComponent,
    FilterByNamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
