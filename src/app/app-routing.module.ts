import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//import { AuthGuardService } from './shared/filters/auth-guard.service';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './pages/login/login.component';
import { AuthCustomComponent } from './pages/auth/auth-custom.component';

const routes: Routes = [

  {
    path: 'pages',
    loadChildren: () => import('../app/pages/pages.module')
      .then(m => m.PagesModule),
  },

  
  {
    path: 'login',
    component: AuthCustomComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },

 /* {
    path: 'reset-senha',
    component: AuthCustomComponent,
    children: [
      {
        path: '',
        component: ResetSenhaComponent,
      }
    ]
  },*/

  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
