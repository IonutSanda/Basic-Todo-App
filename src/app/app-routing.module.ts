import {
  TaskEditComponent
} from './tasks/task-edit/task-edit.component';
import {
  TasksListComponent
} from './tasks/tasks-list/tasks-list.component';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TasksListComponent,
  },
  {
    path: 'new',
    component: TaskEditComponent,
  },
  {
    path: 'edit',
    component: TaskEditComponent,
    children: [
      {
        path: ':id',
        component: TaskEditComponent
      }
    ]
  },
  {
    path: '**',
    component: TasksListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
