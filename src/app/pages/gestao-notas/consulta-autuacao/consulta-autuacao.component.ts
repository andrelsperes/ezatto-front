import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { ConsultaAutuacaoService } from './consulta-autuacao.service';

@Component({
  selector: 'ngx-consulta-autuacao',
  templateUrl: './consulta-autuacao.component.html',
  styleUrls: ['./consulta-autuacao.component.scss'],
})

export class ConsultaAutuacaoComponent implements OnInit {

  public formAutoInfracao = null;
  public id = null;
  public tableLimit = 10;


  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private encriptyService: EncriptyUtilService,
    private service: ConsultaAutuacaoService,
    private notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
  ) {

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.id = this.encriptyService.decriptyBySecretKey(params.get('idAutuacao'));
    });

    let params = new HttpParams();

    if (this.id != null) {

      params = params.append('idAutuacao', this.id)
      params = params.append('size', String(this.tableLimit))

    }

    this.service.buscaInfracao(params, (response) => {

      let dataHoraInfracao = moment(response.dataHoraInfracao).format('DD/MM/YYYY HH:mm');
      let tipoAssinatura = response.tipoAssinatura;

      this.formAutoInfracao.controls['placa'].setValue(response.veiculo.placa);

      this.formAutoInfracao.controls['especie'].setValue(response.veiculo.especie.descricao);
      this.formAutoInfracao.controls['categoria'].setValue(response.veiculo.tipo.descricao);
      this.formAutoInfracao.controls['nome'].setValue(response.usuario.nome);
      this.formAutoInfracao.controls['cpf'].setValue(response.usuario.cpf);
      this.formAutoInfracao.controls['logradouro'].setValue(response.logradouro);
      this.formAutoInfracao.controls['numero'].setValue(response.nrKm);
      this.formAutoInfracao.controls['bairro'].setValue(response.bairro);
      this.formAutoInfracao.controls['codigoInfracao'].setValue(response.infracao.codigoInfracao);
      this.formAutoInfracao.controls['dataHora'].setValue(dataHoraInfracao);
      this.formAutoInfracao.controls['identificadorAutuacao'].setValue(response.identificadorAutuacao);
      this.formAutoInfracao.controls['instrumentoApuracao'].setValue(response.instrumentoApuracao);
      this.formAutoInfracao.controls['medicaoRealizada'].setValue(response.medidaRealizada);
      this.formAutoInfracao.controls['limiteRegulamentado'].setValue(response.limiteRegulamentado);
      this.formAutoInfracao.controls['observacao'].setValue(response.descricao.toUpperCase());
      this.formAutoInfracao.controls['descricao'].setValue(response.infracao.descricao.toUpperCase());

      if (tipoAssinatura === 'ASSINOU') {

        this.formAutoInfracao.controls['assinou'].setValue(response.tipoAssinatura);
        this.formAutoInfracao.controls['recusouAssinar'].setValue('');
        this.formAutoInfracao.controls['naoAbordado'].setValue('');

      } else if (tipoAssinatura === 'NAOASSINOU') {

        this.formAutoInfracao.controls['naoAbordado'].setValue('NÃO ASSINOU');
        this.formAutoInfracao.controls['recusouAssinar'].setValue('');
        this.formAutoInfracao.controls['assinou'].setValue('');

      } else if (tipoAssinatura === 'RECUSOU') {

        this.formAutoInfracao.controls['recusouAssinar'].setValue(response.tipoAssinatura);
        this.formAutoInfracao.controls['assinou'].setValue('');
        this.formAutoInfracao.controls['naoAbordado'].setValue('');
      }

      if (response.veiculo.pais != null) {
        this.formAutoInfracao.controls['paisVeiculo'].setValue(response.veiculo.pais.descricao);

      } else {
        this.formAutoInfracao.controls['paisVeiculo'].setValue(response.veiculo.pais);
      }

      if (response.veiculo.fabricante != null) {
        this.formAutoInfracao.controls['marcaVeiculo'].setValue(response.veiculo.fabricante.descricao);

      } else {
        this.formAutoInfracao.controls['marcaVeiculo'].setValue(response.veiculo.fabricanteInformado);
      }

      if (response.veiculo.modelo != null) {
        this.formAutoInfracao.controls['modeloVeiculo'].setValue(response.veiculo.modelo.descricao);

      } else {
        this.formAutoInfracao.controls['modeloVeiculo'].setValue(response.veiculo.modeloInformado);
      }

      if (response.veiculo.municipio != null) {
        this.formAutoInfracao.controls['cidadeVeiculo'].setValue(response.veiculo.municipio.descricao);

      } else {
        this.formAutoInfracao.controls['cidadeVeiculo'].setValue(response.veiculo.municipio);
      }

      if (response.veiculo.uf != null) {
        this.formAutoInfracao.controls['estadoVeiculo'].setValue(response.veiculo.uf.descricao);

      } else {
        this.formAutoInfracao.controls['estadoVeiculo'].setValue(response.veiculo.uf);
      }

      if (response.condutor != null) {
        this.formAutoInfracao.controls['numeroCNH'].setValue(response.condutor.nrCnh);

      } else {
        this.formAutoInfracao.controls['numeroCNH'].setValue(null);
      }

      if (response.condutor != null) {
        this.formAutoInfracao.controls['estadoCondutor'].setValue(response.condutor.uf.descricao);

      } else {
        this.formAutoInfracao.controls['estadoCondutor'].setValue(null);
      }

      if (response.municipio != null) {
        this.formAutoInfracao.controls['cidadeInfracao'].setValue(response.municipio.descricao.toUpperCase());

      } else {
        this.formAutoInfracao.controls['cidadeInfracao'].setValue(response.municipioGeocode.toUpperCase());
      }

      if (response.municipio != null) {
        this.formAutoInfracao.controls['estadoInfracao'].setValue(response.uf.descricao.toUpperCase());

      } else {
        this.formAutoInfracao.controls['estadoInfracao'].setValue(response.ufGeocode.toUpperCase());
      }

    }, (error) => {
      this.notifications.error('Não foi possível buscar informações da Infração.');
    });

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
