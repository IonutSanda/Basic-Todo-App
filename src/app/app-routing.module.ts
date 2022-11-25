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
    redirectTo: '/open',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TasksListComponent,
    loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
