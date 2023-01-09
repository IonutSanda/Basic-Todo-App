import { AuthGuard } from './tasks/services/guards/auth.guard';
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
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full'
  },
  {
    path: 'authenticate',
    component: AuthComponent
  },
  {
    path: 'todos',
    component: TasksListComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: '**',
    redirectTo: 'authenticate',
    pathMatch: 'full',
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
