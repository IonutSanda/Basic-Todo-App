import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
    {
        path: 'open',
        component: TasksListComponent,
      },
      {
        path: 'closed',
        component: TasksListComponent,
      },
      {
    
        path: 'deleted',
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
export class TasksRouterModule {}