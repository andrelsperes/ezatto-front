import { NgModule } from '@angular/core';
import { NbCheckboxModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LoginModule } from './login/login.module';
import { GestaoClienteModule } from './gestao-cliente/gestao-cliente.module';
import { GestaoClienteRoutingModule } from './gestao-cliente/gestao-cliente-routing.module';
import { GestaoNotasRoutingModule } from './gestao-notas/gestao-notas-routing.module';
import { GestaoNotasModule } from './gestao-notas/gestao-notas.module';
import { GestaoUsuarioRoutingModule } from './gestão-usuario/gestao-usuario-routing.module';
import { GestaoUsuarioModule } from './gestão-usuario/gestao-usuario.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { RelatorioRoutingModule } from './relatorio/relatorio-routing.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCheckboxModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    LoginModule,
    GestaoClienteModule,
    GestaoClienteRoutingModule,
    GestaoUsuarioModule,
    GestaoUsuarioRoutingModule,
    GestaoNotasModule,
    GestaoNotasRoutingModule,
    RelatorioModule,
    RelatorioRoutingModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
