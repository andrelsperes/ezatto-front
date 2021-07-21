import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { EncriptyUtilService } from '../../../../shared/services/encripty-util.service';
import { CadastroClienteService } from './cadastro-cliente.service';
import { NotificationsService } from 'angular2-notifications';
import { DateUtilService } from '../../../../shared/services/date-util.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})

export class CadastroClienteComponent implements OnInit {

  public idCliente = null;
  public isRegister = null;
  public cnpjCpf = null;
  public cnpj = null;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    showTodayBtn: false,
    allowSelectionOnlyInCurrentMonth: false,
    dayLabels: { su: "Dom", mo: "Seg", tu: "Ter", we: "Qua", th: "Qui", fr: "Sex", sa: "Sab" },
    monthLabels: { 1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez" },
    firstDayOfWeek: "su",
    //disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 }
  };

  public tipoStatus = null;
  public token = null;
  public listaEstado = null;
  public listaCidade = null;
  public listaTplogradouro = null;
  public formCadastroCliente: FormGroup = null;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private notifications: NotificationsService,
    private dateUtilService: DateUtilService,
    private service: CadastroClienteService,
    private activatedRoute: ActivatedRoute,
    private encriptyService: EncriptyUtilService,
    private spinnerService: NgxSpinnerService,

  ) {

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.idCliente = this.encriptyService.decriptyBySecretKey(params.get('id'));
      this.cnpj = this.encriptyService.decriptyBySecretKey(params.get('cpfCnpj'));
      this.isRegister = this.encriptyService.decriptyBySecretKey(params.get('isRegister'));
    });

    let token = localStorage.getItem('bway-token');

    // this.service.buscaEstado(token, (response) => {
    //   this.listaEstado = response;
    // }, (error) => {
    //   this.notifications.error('Não foi possível buscar informações do cliente');
    // });

    if (this.idCliente != null) {

      this.buscaClien(this.cnpj);

    }

    this.tipoStatus = [

      {
        status: 'ATIVO',
        descricao: 'ATIVO'
      },

      {
        status: 'INATIVO',
        descricao: 'INATIVO'
      },

      {
        status: 'CANCELADO',
        descricao: 'CANCELADO'
      },

    ];

  }

  ngOnInit() {

    this.formCadastroCliente = this.formBuilder.group({

      id: [null],
      cpfCnpj: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      dataCadastro: [null, Validators.required],
      dataVigencia: [null],
      valorPlano: [null],
      status: [null, Validators.required],
      telefone: [null, Validators.required],
      nomeResponsavel: [null, Validators.required],
      email: [null, Validators.required],
      cep: [null],
      estado: [null, Validators.required],
      cidade: [null, Validators.required],
      bairro: [null],
      complemento: [null],
      logradouro: [null],
      numero: [null],
      senha: [null]

    });

  }

  isCPF(): boolean {
    return this.cnpjCpf == null ? true : this.cnpjCpf.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  buscaCidade(data) {

    let params = new HttpParams();
    let token = localStorage.getItem('bway-token');

    if (data.estado != null) {

      params = params.append('idUf', data.estado);

      this.service.buscaCidade(params, token, (response) => {
        this.listaCidade = response;
      }, (error) => {
        this.notifications.error('Não foi possível buscar informações do cliente');
      });

    }
  }

  buscaClien(data: any) {

    let params = new HttpParams();

    if (data != null) {

      params = params.append('cpfCnpj', data);

      this.spinnerService.show();
      this.service.buscaClien(params, null, (response) => {
        this.buscaCliente(response);
        this.spinnerService.hide();
      }, (error) => {
        this.spinnerService.hide();
        this.notifications.error('Não foi possível buscar informações do cliente');
      });

    }

  }

  buscaCliente(data: any) {

    if (data != null) {

      this.formCadastroCliente.controls['razaoSocial'].setValue(data.content[0].razaoSocial);
      this.formCadastroCliente.controls['bairro'].setValue(data.content[0].bairro);
      this.formCadastroCliente.controls['cep'].setValue(data.content[0].cep);
      this.formCadastroCliente.controls['complemento'].setValue(data.content[0].complemento);
      this.formCadastroCliente.controls['cpfCnpj'].setValue(data.content[0].cpfCnpj);
      this.formCadastroCliente.controls['status'].setValue(data.content[0].status.descricao);
      this.formCadastroCliente.controls['email'].setValue(data.content[0].email);
      this.formCadastroCliente.controls['nomeFantasia'].setValue(data.content[0].nomeFantasia);
      this.formCadastroCliente.controls['telefone'].setValue(data.content[0].telefone);
      this.formCadastroCliente.controls['nomeResponsavel'].setValue(data.content[0].nomeResposavel);
      this.formCadastroCliente.controls['numero'].setValue(data.content[0].numero);
      this.formCadastroCliente.controls['logradouro'].setValue(data.content[0].rua);
      this.formCadastroCliente.controls['valorPlano'].setValue(data.content[0].valorPlano);
      this.formCadastroCliente.controls['estado'].setValue(data.content[0].estado);
      this.formCadastroCliente.controls['cidade'].setValue(data.content[0].cidade);
      this.formCadastroCliente.controls['senha'].setValue(data.content[0].senha);

      if (data.content[0].dtCadastro != null) {
        let dataCadastro = {
          date: {
            year: new Date(data.content[0].dtCadastro).getFullYear(),
            month: new Date(data.content[0].dtCadastro).getMonth() + 1,
            day: new Date(data.content[0].dtCadastro).getDate() + 1,
          }
        }
        this.formCadastroCliente.controls['dataCadastro'].setValue(dataCadastro);
      }

      if (data.content[0].dtVigencia != null) {
        let dataVigencia = {
          date: {
            year: new Date(data.content[0].dtVigencia).getFullYear(),
            month: new Date(data.content[0].dtVigencia).getMonth() + 1,
            day: new Date(data.content[0].dtVigencia).getDate() + 1,
          }
        }
        this.formCadastroCliente.controls['dataVigencia'].setValue(dataVigencia);
      }

    }

  }

  limparForm() {

    this.formCadastroCliente.controls['nome'].setValue(null);

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  number(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode == 45)) {

      this.formCadastroCliente.controls['valorPlano'].setValue(null);
      this.notifications.error('Não é permitido números negativos!!!!');

    }
    return true;

  }

  saveFormCadastro(data) {

    if ((data.dataCadastro != null && data.dataVigencia != null)) {

      let dtCadastro: string = this.dateUtilService.datepickerTransformDate(data.dataCadastro, 'YYYY-MM-DD');
      let dtVigencia: string = this.dateUtilService.datepickerTransformDate(data.dataVigencia, 'YYYY-MM-DD');

      data.dtCadastro = dtCadastro;
      data.dtVigencia = dtVigencia;

    }

    let register: any = {
      cpfCnpj: data.cpfCnpj,
      dtCadastro: data.dtCadastro,
      dtVigencia: data.dtVigencia,
      email: data.email.toUpperCase(),
      nomeFantasia: data.nomeFantasia.toUpperCase(),
      nomeResposavel: data.nomeResponsavel.toUpperCase(),
      razaoSocial: data.razaoSocial.toUpperCase(),
      telefone: data.telefone,
      valorPlano: data.valorPlano,
      senha: data.senha
    }

    this.spinnerService.show();

    this.service.createCliente(register, (response) => {
      this.formatSaveCadastro(response);
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      this.notifications.error(error.message);
    });


  }

  formatSaveCadastro(ret) {

    if (ret || ret == null) {

      this.formCadastroCliente = this.formBuilder.group({

        id: [null],
        cpfCnpj: [null, Validators.required],
        razaoSocial: [null, Validators.required],
        nomeFantasia: [null, Validators.required],
        dataCadastro: [null, Validators.required],
        dataVigencia: [null],
        valorPlano: [null],
        status: [null, Validators.required],
        telefone: [null, Validators.required],
        nomeResponsavel: [null, Validators.required],
        email: [null, Validators.required],
        cep: [null],
        estado: [null, Validators.required],
        cidade: [null, Validators.required],
        bairro: [null],
        complemento: [null],
        logradouro: [null],
        numero: [null],
        senha: [null]

      });

      this.notifications.success('Cliente salvo com sucesso!')

    }

  }

  previousPage() {
    this.location.back();
  }

  fecharForm() {
    this.previousPage();
  }

}
