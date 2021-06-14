/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from './shared/services/commom.service';
import { EncriptyUtilService } from './shared/services/encripty-util.service';
import { GestaoClienteModule } from './pages/gestao-cliente/gestao-cliente.module';
import { GestaoClienteRoutingModule } from './pages/gestao-cliente/gestao-cliente-routing.module';
import { GestaoUsuarioModule } from './pages/gestão-usuario/gestao-usuario.module';
import { GestaoUsuarioRoutingModule } from './pages/gestão-usuario/gestao-usuario-routing.module';
import { SpringDatatablePaginationService } from './shared/services/spring-integration/pagination/spring-datatable-pagination.service';
import { LoadingBarService, LoadingBarModule } from 'ng2-loading-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { InputCounterModule } from 'ng4-input-counter';
import { DimensionsHelper, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { GestaoNotasModule } from './pages/gestao-notas/gestao-notas.module';
import { GestaoNotasRoutingModule } from './pages/gestao-notas/gestao-notas-routing.module';
import { AuthCustomModule } from './pages/auth/auth-custom.module';
import { LoginModule } from './pages/login/login.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { HttpService } from './shared/services/http/http-client.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TokenInterceptorService } from './shared/filters/token-interceptor.service';
import { RelatorioModule } from './pages/relatorio/relatorio.module';
import { RelatorioRoutingModule } from './pages/relatorio/relatorio-routing.module';
import { GestaoAuditorModule } from './pages/gestao-auditor/gestao-auditor.module';
import { GestaoAuditorRoutingModule } from './pages/gestao-auditor/gestao-auditor-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    InputCounterModule.forRoot(),
    AuthCustomModule,
    LoginModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    LoadingBarModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    GestaoClienteModule,
    GestaoClienteRoutingModule,
    GestaoUsuarioModule,
    GestaoUsuarioRoutingModule,
    GestaoNotasModule,
    GestaoNotasRoutingModule,
    RelatorioModule,
    RelatorioRoutingModule,
    GestaoAuditorModule,
    GestaoAuditorRoutingModule,
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    { provide : LocationStrategy , useClass: HashLocationStrategy},
    AuthenticationService,
    HttpService,
    CommonService,
    EncriptyUtilService,
    SpringDatatablePaginationService,
    DimensionsHelper,
    LoadingBarService,
    NgxSpinnerService,
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
