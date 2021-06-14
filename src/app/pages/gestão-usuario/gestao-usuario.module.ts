import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbSpinnerModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { GestaoUsuarioComponent } from './gestao-usuario.component';
import { GestaoUsuarioRoutingModule } from './gestao-usuario-routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyDatePickerModule } from 'mydatepicker';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/cadastro-usuario.component';
import { ListaUsuarioComponent } from './usuario/lista-usuario/lista-usuario.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
  imports: [
    CommonModule,
    GestaoUsuarioRoutingModule,
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
    GestaoUsuarioComponent,  
    CadastroUsuarioComponent,
    ListaUsuarioComponent, 
  ],
  entryComponents:[
  ],
  providers: [
  ]
})
export class GestaoUsuarioModule { }
