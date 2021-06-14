import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SpringDatatablePagination } from '../../../shared/services/spring-integration/pagination/spring-datatable-pagination';
import { DatatableService } from '../../../shared/services/datatable.service';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { SpringDatatablePaginationService } from '../../../shared/services/spring-integration/pagination/spring-datatable-pagination.service';
import { UploadArquivosService } from './upload-arquivos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'ngx-lista-autuacao',
  templateUrl: './upload-arquivos.component.html',
  styleUrls: ['./upload-arquivos.component.scss']
})
export class UploadArquivosComponent implements OnInit, OnDestroy {

  public formlistaAutuacao = null;
  public rowData = null;
  public tableLimit = 10;
  public listaStatus = null;

  @ViewChild('myTable', null)
  public myTable: DatatableComponent;

  datatablePagination: SpringDatatablePagination = new SpringDatatablePagination();

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private datatableService: DatatableService,
    private service: UploadArquivosService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private encriptyService: EncriptyUtilService,
    private notifications: NotificationsService,
    private paginationService: SpringDatatablePaginationService,
  ) {
    this.rowData = [];
    this.paginationService.setDatatablePagination(this.datatablePagination);

    this.listaStatus = [

      {
        status: '8',
        descricao: 'APROVADO'
      },

      {
        status: '6',
        descricao: 'AGUARDANDO ANÁLISE'
      },

      {
        status: '7',
        descricao: 'REJEITADO'
      },

    ];

  }

  ngOnInit() {

    this.datatableService.subscribeTable(this.myTable);

    this.formlistaAutuacao = this.formBuilder.group({
      cpf: this.formBuilder.control({ value: null, disabled: false }, GenericValidator.isValidCpf()),
      status: [null],
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
      if (data.cpf != null) {
        params = params.append('cpf', data.cpf);
      }

      if (data.status != null) {
        params = params.append('idStatus', data.status);
      }
    }

    this.spinnerService.show();

    this.service.buscaInfracao(params, (response => {

      if (response.content.length === 0) {

        this.spinnerService.hide();
        this.notifications.warn('Não foi encontrado nenhuma atuação.');
        this.datatablePagination.rowData = [null];
        this.datatablePagination.totalElements = 0;

      } else {

        this.rowData = response.content

        this.rowData = this.rowData.map((data) => {
          return {
            id: data.id,
            cpf: data.usuario.cpf,
            dtCadastro: moment(data.usuario.dtCadastro).format('DD/MM/YYYY'),
            email: data.usuario.email,
            nome: data.usuario.nome,
            status: data.status.descricao,
          }

        });

        this.paginationService.setInfo(response)
        this.spinnerService.hide();

      }

    }), null);

  }

  visualizarAutuacao(data) {

    let id = this.encriptyService.encriptyBySecretKey('' + data.id)

    let params = {

      'idAutuacao': id,

    }

    this.router.navigate(['../consulta-autuacao'], { relativeTo: this.route, queryParams: params });
  }

  previousPage() {
    this.router.navigate(['/dashboard']);
  }

}

export class GenericValidator {

  constructor() { }

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
  */
  static isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {

          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
      }
      return null;
    }
  }
}


