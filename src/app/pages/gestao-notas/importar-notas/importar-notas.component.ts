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

  selectedFiles: FileList;
  currentFileUpload: File;

  selectedFile = null;
  progress: { percentage: number } = { percentage: 0 };



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

  upload() {
    this.spinnerService.show();
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    let register = {
      nomeArquivo: this.currentFileUpload.name,
      arquivo: this.currentFileUpload
    }

    this.service.uploadNota(
      register,
      (response) => {
        this.selectedFiles = undefined;
        this.spinnerService.hide();
        this.notifications.success('Operação salvo com sucesso.');
        this.previousPage();
      },
      (error) => {
        this.selectedFiles = undefined;
        this.spinnerService.hide();
        this.notifications.error(error.message);
      }
    );
  }

  previousPage() {
    this.location.back();
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

}
