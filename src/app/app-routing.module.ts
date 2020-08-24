import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './authentication/login.component';
import { SignupComponent } from './authentication/signup.component';
import { IndexComponent } from './index/index.component';
import { TodosComponent } from './todos/todos.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { title: 'Welcome Page' },
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
    data: { title: 'Signup' },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'todos',
    component: TodosComponent,
    data: { title: 'Todo' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
