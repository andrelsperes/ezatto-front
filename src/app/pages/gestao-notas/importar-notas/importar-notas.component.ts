import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { ImportarNotasService } from './importar-notas.service';

@Component({
  selector: 'ngx-importar-notas',
  templateUrl: './importar-notas.component.html',
  styleUrls: ['./importar-notas.component.scss'],
})

export class ImportarNotasComponent implements OnInit {

  @ViewChild('fileInput', null) fileInput;
  @ViewChild('fileLabel', null) fileLabel;

  public formAutoInfracao = null;
  public id = null;
  public tableLimit = 10;


  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private encriptyService: EncriptyUtilService,
    private service: ImportarNotasService,
    private notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
  ) {

  }

  ngOnInit() {

    this.formAutoInfracao = this.formBuilder.group({
      id: [null],
      placa: [null],
      paisVeiculo: [null],
      nome: [null],
      cpf: [null],
      numeroCNH: [null],
      categoria: [null],
      dataHora: [null],
      telefone: [null],
      especie: [null],
      cep: [null],
      estadoVeiculo: [null],
      cidadeVeiculo: [null],
      bairro: [null],
      complemento: [null],
      logradouro: [null],
      numero: [null],
      codigoInfracao: [null],
      descricao: [null],
      instrumentoApuracao: [null],
      marcaVeiculo: [null],
      modeloVeiculo: [null],
      medicaoConsiderada: [null],
      limiteRegulamentado: [null],
      medicaoRealizada: [null],
      observacao: [null],
      naoAbordado: [null],
      assinou: [null],
      recusouAssinar: [null],
      matriculaAgente: [null],
      estadoCondutor: [null],
      estadoInfracao: [null],
      cidadeInfracao: [null],
      descMotivo: [null],
      descParecer: [null],
      identificadorAutuacao: [null],
    });

  }

  showPdf() {

    let id: any = this.encriptyService.encriptyBySecretKey('' + this.id);

    let params: any = {
      'id': id,
    };

    this.router.navigate(['../visualizar-anexo'], { relativeTo: this.route, queryParams: params });

  }

  salvaAutuacao(data) {

    let register = {

      descricao: data.descMotivo.toUpperCase(),
      idAutuacao: this.id,
      parecer: data.descParecer.toUpperCase(),

    }

    this.spinnerService.show();
    this.service.setaParecer(
      register,
      (response) => {
        this.spinnerService.hide();
        this.notifications.success('Operação salvo com sucesso.');
        this.previousPage();
      },
      (error) => {
        this.spinnerService.hide();
        this.notifications.error(error.message);
      }
    );
  }

  previousPage() {
    this.location.back();
  }

}
