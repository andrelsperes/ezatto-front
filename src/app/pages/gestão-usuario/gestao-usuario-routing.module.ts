import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GestaoUsuarioComponent } from './gestao-usuario.component';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';

const routes: Routes = [{ 
  path: '',
  component: GestaoUsuarioComponent,
  children: [
    {
      path: 'cadastro-usuario',
      component: CadastroUsuarioComponent,
      
    },
    {
      path: 'lista-usuario',
      component: ListaUsuarioComponent,
      
    },   
       
  ],

}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class GestaoUsuarioRoutingModule { }

export const routedComponents = [
  GestaoUsuarioComponent,
  CadastroUsuarioComponent,  
  ListaUsuarioComponent,
];
