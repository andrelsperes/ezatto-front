import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSpinnerModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { GestaoClienteComponent } from './gestao-cliente.component';
import { GestaoClienteRoutingModule } from './gestao-cliente-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CadastroClienteComponent } from './cliente/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './cliente/lista-cliente/lista-cliente.component';
import { DualListModule } from '../../shared/components/dualList/dual-list.module';
import { ComponentstModule } from '../../shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    GestaoClienteRoutingModule,
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
    DualListModule,
    ComponentstModule,
    NbCheckboxModule,
    CurrencyMaskModule,
    NgxMyDatePickerModule.forRoot(),   

  ],
  exports: [
    MyDatePickerModule,
  ],
  declarations: [
   GestaoClienteComponent,
   CadastroClienteComponent,
   ListaClienteComponent,
  ],
  entryComponents:[
  ],
  providers: [
  ]
})
export class GestaoClienteModule { }
