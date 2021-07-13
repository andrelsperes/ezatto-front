import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GestaoNotasComponent } from './gestao-notas.component';
import { ImportarNotasComponent } from './importar-notas/importar-notas.component';
import { UploadArquivosComponent } from './upload-arquivos/upload-arquivos.component';

const routes: Routes = [{
  path: '',
  component: GestaoNotasComponent,
  children: [
    {
      path: 'upload-arquivos',
      component: UploadArquivosComponent,

    },
    {
      path: 'importar-notas',
      component: ImportarNotasComponent,

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
  ImportarNotasComponent,
  UploadArquivosComponent,
];
