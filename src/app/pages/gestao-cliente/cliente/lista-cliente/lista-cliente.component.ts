import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ListaClienteService } from './lista-cliente.service';
import { EncriptyUtilService } from '../../../../shared/services/encripty-util.service';
import { SpringDatatablePagination } from '../../../../shared/services/spring-integration/pagination/spring-datatable-pagination';
import { SpringDatatablePaginationService } from '../../../../shared/services/spring-integration/pagination/spring-datatable-pagination.service';
import { DatatableService } from '../../../../shared/services/datatable.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ngx-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss']
})
export class ListaClienteComponent implements OnInit, OnDestroy {

  public formlistaCliente = null;
  public rowData = null;
  public tableLimit = 10;
  public listClie = null; 

  @ViewChild('myTable', null)
  public myTable: DatatableComponent;

  datatablePagination: SpringDatatablePagination = new SpringDatatablePagination();

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private datatableService: DatatableService,
    private service: ListaClienteService,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private encriptyService: EncriptyUtilService,
    private paginationService: SpringDatatablePaginationService,
  ) {

    this.paginationService.setDatatablePagination(this.datatablePagination);

  }

  ngOnInit() {

    this.datatableService.subscribeTable(this.myTable);
    this.formlistaCliente = this.formBuilder.group({
      cnpj: [null],
      nome: [null],
    });

  }

  ngOnDestroy() {
    this.datatableService.unsubscribeTable(this.myTable)
  }

  pesquisarcliente(data?: any, page?: string) {

    let params = new HttpParams();

    params = params.append('size', String(this.tableLimit));

    if (page) {
      params = params.append('page', page);
    }

    if (data) {
      if (data.cnpj != null) {
        params = params.append('cnpj', data.cnpj);
      }

      if (data.nome != null && String(data.nome).trim() !== '') {
        params = params.append('nome', data.nome.toUpperCase());
      }
    }

    this.service.buscaCliente(params, (response => {

      this.rowData = response.content
      this.listClie = response.content.length
      this.paginationService.setInfo(response)

      if (this.listClie === 0) {
        this.notifications.warn('Não existe cliente cadastrado.');
      }

    }), null);


  }

  opencadastro() {
    let params: any = {
      'isRegister': this.encriptyService.encriptyBySecretKey('S'),
    };
    this.router.navigate(['../cadastro-cliente'], { relativeTo: this.route, queryParams: params });
  }

  gotoEdit(data){

    let cpfCnpj: any = this.encriptyService.encriptyBySecretKey('' + data.cpfCnpj);
    let id: any = this.encriptyService.encriptyBySecretKey('' + data.id);

    let params: any = {
      'id': id,
      'cpfCnpj': cpfCnpj,
      'isRegister': this.encriptyService.encriptyBySecretKey('N'),
    };

    this.router.navigate(['../cadastro-cliente'], { relativeTo: this.route, queryParams: params });

  }

  previousPage() {
    this.router.navigate(['/dashboard']);
  }
}
