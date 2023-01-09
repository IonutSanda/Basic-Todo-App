import { RegisterComponent } from './auth/register/register.component';
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
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'todos',
    component: TasksListComponent,
    loadChildren: () => import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: '**',
    component: LoginComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
