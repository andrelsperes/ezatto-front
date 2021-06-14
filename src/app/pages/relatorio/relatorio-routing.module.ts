import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioAutuacaoAgenteComponent } from './relatorio-autuacao-agente/relatorio-autuacao-agente.component';
import { RelatorioInfracaoMensalComponent } from './relatorio-infracao-mensal/relatorio-infracao-mensal.component';

const routes: Routes = [{ 
  path: '',
  component: RelatorioComponent,
  children: [
    {
      path: 'relatorio-autuacao-agente',
      component: RelatorioAutuacaoAgenteComponent,
      
    },   
    {
      path: 'relatorio-infracao-mensal',
      component: RelatorioInfracaoMensalComponent,
      
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
export class RelatorioRoutingModule { }

export const routedComponents = [
  RelatorioComponent,  
  RelatorioAutuacaoAgenteComponent,
  RelatorioInfracaoMensalComponent,
];
