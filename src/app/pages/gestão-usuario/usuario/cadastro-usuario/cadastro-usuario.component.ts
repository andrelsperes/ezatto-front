import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { EncriptyUtilService } from '../../../../shared/services/encripty-util.service';
import { DateUtilService } from '../../../../shared/services/date-util.service';
import { CadastroUsuarioService } from './cadastro-usuario.service';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})

export class CadastroUsuarioComponent implements OnInit {

  public formCadastroUsuario = null;
  public listCardSexo = null;
  public listCardStatus = null;
  public isRegister = null;
  public cpf = null;
  public idUser = null;

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

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private dateUtilService: DateUtilService,
    private service: CadastroUsuarioService,
    private notifications: NotificationsService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private encriptyService: EncriptyUtilService,

  ) {

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.idUser = this.encriptyService.decriptyBySecretKey(params.get('id'));
      this.cpf = this.encriptyService.decriptyBySecretKey(params.get('cpf'));
      this.isRegister = this.encriptyService.decriptyBySecretKey(params.get('isRegister'));
    });

    if (this.idUser != null) {

      this.buscaUser(this.cpf);

    }


    this.listCardSexo = [

      {
        sexo: 'MASCULINO',
        descricao: 'MASCULINO'
      },

      {
        sexo: 'FEMININO',
        descricao: 'FEMININO'
      },

    ];

    this.listCardStatus = [

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

    this.formCadastroUsuario = this.formBuilder.group({

      id: [null],
      cpf: this.formBuilder.control({ value: null, disabled: false }, GenericValidator.isValidCpf()),
      nomeUsuario: [null, Validators.required],
      dataCadastro: [null, Validators.required],
      status: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      matricula: [null],
      sexo: [null],
      senha: [null]

    });

  }

  saveFormCadastro(data) {

    if (data.dataCadastro != null) {

      let dtCadastro: string = this.dateUtilService.datepickerTransformDate(data.dataCadastro, 'YYYY-MM-DD');
      data.dtCadastro = dtCadastro;

    }

    if(data.nomeUsuario === null){
      this.notifications.error('Campo nome é obrigatório.');
    }else if(data.cpf === null){
      this.notifications.error('Campo CPF é obrigatório.');
    }else if(data.matricula === null){
      this.notifications.error('Campo matrícula é obrigatório.');
    }else if(data.status === null){
      this.notifications.error('Campo status é obrigatório.');
    }else if(data.email === null){
      this.notifications.error('Campo email é obrigatório.');
    }else if(data.sexo === null){
      this.notifications.error('Campo sexo é obrigatório.');
    }else if(data.senha === null){
      this.notifications.error('Campo senha é obrigatório.');
    }else if(data.telefone === null){
      this.notifications.error('Campo telefone é obrigatório.');
    }else if(data.dataCadastro === null){
      this.notifications.error('Campo data cadastro é obrigatório.');
    }else{
      if (this.isRegister === 'S') {

        let register: any = {
          idEntidade: null,
          cpf: data.cpf,
          dtCadastro: data.dtCadastro,
          email: data.email.toUpperCase(),
          nome: data.nomeUsuario.toUpperCase(),
          sexo: data.sexo.toUpperCase(),
          telefone: data.telefone,
          matricula: data.matricula,
          senha: data.senha.toUpperCase()
        }
  
        this.service.createUser(register, (response) => {
          this.formatSaveCadastro(response);
          this.spinnerService.hide();
        }, (error) => {
          this.spinnerService.hide();
          this.notifications.error(error.message);
        });
  
      } else if (this.isRegister === 'N') {
  
        let register: any = {
          idEntidade: this.idUser,
          cpf: data.cpf,
          dtCadastro: data.dtCadastro,
          email: data.email.toUpperCase(),
          nome: data.nomeUsuario.toUpperCase(),
          sexo: data.sexo.toUpperCase(),
          telefone: data.telefone,
          matricula: data.matricula,
          senha: data.senha.toUpperCase()
        }
  
        this.service.createUser(register, (response) => {
          this.formatSaveCadastro(response);
          this.spinnerService.hide();
        }, (error) => {
          this.spinnerService.hide();
          this.notifications.error(error.message);
        });
  
      } else {
        this.notifications.error('Não foi possível encontrar a natureza da operação');
      }
    } 

  }

  formatSaveCadastro(ret) {

    if (ret || ret == null) {

      this.formCadastroUsuario = this.formBuilder.group({
        id: [null],
        nomeUsuario: [null, Validators.required],
        cpf: [null, Validators.required],
        sexo: [null, Validators.required],
        dataCadastro: [null, Validators.required],
        email: [null, Validators.required],
        telefone: [null, Validators.required],
        status: [null, Validators.required],
        matricula: [null, Validators.required],
        senha: [null]

      });

      this.notifications.success('Colaborador salvo com sucesso!')

    }

  }

  buscaUser(data: any) {

    let params = new HttpParams();

    if (data != null) {

      params = params.append('cpf', data);

      this.spinnerService.show();
      this.service.buscaUser(params, null, (response) => {
        this.buscaUsuario(response);
        this.spinnerService.hide();
      }, (error) => {
        this.spinnerService.hide();
        this.notifications.error('Não foi possível buscar informações do usuário');
      });

    }

  }

  buscaUsuario(data: any) {

    if (data != null) {

      this.formCadastroUsuario.controls['nomeUsuario'].setValue(data.content[0].nome);
      this.formCadastroUsuario.controls['cpf'].setValue(data.content[0].cpf);
      this.formCadastroUsuario.controls['status'].setValue(data.content[0].status.descricao);
      this.formCadastroUsuario.controls['email'].setValue(data.content[0].email);
      this.formCadastroUsuario.controls['sexo'].setValue(data.content[0].sexo);
      this.formCadastroUsuario.controls['telefone'].setValue(data.content[0].telefone);
      this.formCadastroUsuario.controls['senha'].setValue(data.content[0].senha);
      this.formCadastroUsuario.controls['matricula'].setValue(data.content[0].matricula);

      if (data.content[0].dtCadastro != null) {
        let dataCadastro = {
          date: {
            year: new Date(data.content[0].dtCadastro).getFullYear(),
            month: new Date(data.content[0].dtCadastro).getMonth() + 1,
            day: new Date(data.content[0].dtCadastro).getDate() + 1,
          }
        }
        this.formCadastroUsuario.controls['dataCadastro'].setValue(dataCadastro);
      }

    }

  }

  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  fecharForm() {
    this.location.back();
  }

  previousPage() {
    this.location.back();
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
