import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
   
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
