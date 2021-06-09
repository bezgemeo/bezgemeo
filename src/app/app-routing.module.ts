import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginScreenComponent} from "./core/components/login-screen/login-screen.component";
import {RegistrationScreenComponent} from "./core/components/registration-screen/registration-screen.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: 'registration',
    component: RegistrationScreenComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./core/features/main-page/main-page.module').then(m => m.MainPageModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
