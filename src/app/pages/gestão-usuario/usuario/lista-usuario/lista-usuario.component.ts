import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ListaClienteService } from './lista-usuario.service';
import { EncriptyUtilService } from '../../../../shared/services/encripty-util.service';
import { CommonService } from '../../../../shared/services/commom.service';
import { SpringDatatablePagination } from '../../../../shared/services/spring-integration/pagination/spring-datatable-pagination';
import { SpringDatatablePaginationService } from '../../../../shared/services/spring-integration/pagination/spring-datatable-pagination.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatatableService } from '../../../../shared/services/datatable.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit, OnDestroy {

  public formlistaUsuario = null;
  public rowData = null;
  public tableLimit = 10;
  public listUser = null;

  @ViewChild('myTable', null)
  public myTable: DatatableComponent;

  datatablePagination: SpringDatatablePagination = new SpringDatatablePagination();

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private service: ListaClienteService,
    private commomService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private encriptyService: EncriptyUtilService,
    private paginationService: SpringDatatablePaginationService,
    private datatableService: DatatableService,
  ) {

    this.paginationService.setDatatablePagination(this.datatablePagination);

  }

  ngOnInit() {

    this.datatableService.subscribeTable(this.myTable);

    this.formlistaUsuario = this.formBuilder.group({
      cpf: this.formBuilder.control({ value: null, disabled: false }, GenericValidator.isValidCpf()),
      nome: [null],
    });

  }

  ngOnDestroy() {

    this.datatableService.unsubscribeTable(this.myTable)

  }

  opencadastro() {
    let params: any = {
      'isRegister': this.encriptyService.encriptyBySecretKey('S'),
    };
    this.router.navigate(['../cadastro-usuario'], { relativeTo: this.route, queryParams: params });
  }

  buscar(data: any, page?: string) {

    let params = new HttpParams();
    params = params.append('size', String(this.tableLimit));

    if (page) {
      params = params.append('page', page);
    }

    if (data) {
      if (data.cpf != null) {
        params = params.append('cpf', data.cpf);
      }

      if (data.nome != null && String(data.nome).trim() !== '') {
        params = params.append('nome', data.nome.toUpperCase());
      }
    }  

      this.spinnerService.show();

      this.service.buscaUser(params, (response) => {

        this.rowData = response.content
        this.listUser = response.content.length
        this.paginationService.setInfo(response)
        this.spinnerService.hide();
        if (this.listUser === 0) {
          this.notifications.warn('Não existe usuários cadastrados.');
        }
      }, (error) => {
        this.spinnerService.hide();
      });
    
  }

  gotoEdit(data) {

    let cpf: any = this.encriptyService.encriptyBySecretKey('' + data.cpf);
    let id: any = this.encriptyService.encriptyBySecretKey('' + data.id);

    let params: any = {
      'id': id,
      'cpf': cpf,
      'isRegister': this.encriptyService.encriptyBySecretKey('N'),
    };

    this.router.navigate(['../cadastro-usuario'], { relativeTo: this.route, queryParams: params });

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

