import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GestaoNotasComponent } from './gestao-notas.component';
import { ConsultaAutuacaoComponent } from './consulta-autuacao/consulta-autuacao.component';
import { UploadArquivosComponent } from './upload-arquivos/upload-arquivos.component';
import { VisualizarAnexoComponent } from './visualizar-anexo/visualizar-anexo.component';

const routes: Routes = [{
  path: '',
  component: GestaoNotasComponent,
  children: [
    {
      path: 'upload-arquivos',
      component: UploadArquivosComponent,

    },
    {
      path: 'consulta-autuacao',
      component: ConsultaAutuacaoComponent,

    },
    {
      path: 'visualizar-anexo',
      component: VisualizarAnexoComponent,

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
export class GestaoNotasRoutingModule { }

export const routedComponents = [
  GestaoNotasComponent,
  ConsultaAutuacaoComponent,
  UploadArquivosComponent,
  VisualizarAnexoComponent,
];
