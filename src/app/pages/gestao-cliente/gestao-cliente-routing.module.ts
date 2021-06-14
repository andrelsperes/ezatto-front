import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GestaoClienteComponent } from './gestao-cliente.component';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';

const routes: Routes = [{ 
  path: '',
  component: GestaoClienteComponent,
  children: [
    {
      path: 'cadastro-cliente',
      component: CadastroClienteComponent,
      
    },
    {
      path: 'lista-cliente',
      component: ListaClienteComponent,
      
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
export class GestaoClienteRoutingModule { }

export const routedComponents = [
  GestaoClienteComponent,
  CadastroClienteComponent,
  ListaClienteComponent,
  
];
