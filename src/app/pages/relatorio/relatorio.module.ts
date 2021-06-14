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
import { RelatorioComponent } from './relatorio.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioAutuacaoAgenteComponent } from './relatorio-autuacao-agente/relatorio-autuacao-agente.component';
import { RelatorioInfracaoMensalComponent } from './relatorio-infracao-mensal/relatorio-infracao-mensal.component';

@NgModule({
  imports: [
    CommonModule,
    RelatorioRoutingModule,
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
    RelatorioComponent,  
    RelatorioAutuacaoAgenteComponent,
    RelatorioInfracaoMensalComponent,
    
  ],
  entryComponents:[
  ],
  providers: [
  ]
})
export class RelatorioModule { }
