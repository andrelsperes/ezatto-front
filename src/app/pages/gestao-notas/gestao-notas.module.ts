import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSpinnerModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { GestaoNotasComponent } from './gestao-notas.component';
import { GestaoNotasRoutingModule } from './gestao-notas-routing.module';
import { ConsultaNotaComponent } from './consulta-notas/consulta-nota.component';
import { UploadArquivosComponent } from './upload-arquivos/upload-arquivos.component';
import { VisualizarAnexoComponent } from './visualizar-anexo/visualizar-anexo.component';

@NgModule({
  imports: [
    CommonModule,
    GestaoNotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ThemeModule,
    MyDatePickerModule,
    NgxMaskModule.forRoot(),
    NgxDatatableModule,
    NbSpinnerModule,
    NbCheckboxModule,
    CurrencyMaskModule,
    NgxMyDatePickerModule.forRoot(),

  ],
  exports: [
    MyDatePickerModule,
  ],
  declarations: [
    GestaoNotasComponent,
    ConsultaNotaComponent,
    UploadArquivosComponent,
    VisualizarAnexoComponent,

  ],
  entryComponents:[
  ],
  providers: [
  ]
})
export class GestaoNotasModule { }
