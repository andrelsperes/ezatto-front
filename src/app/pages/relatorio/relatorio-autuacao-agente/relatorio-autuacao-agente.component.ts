import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import * as moment from 'moment';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SpringDatatablePagination } from '../../../shared/services/spring-integration/pagination/spring-datatable-pagination';
import { DatatableService } from '../../../shared/services/datatable.service';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { SpringDatatablePaginationService } from '../../../shared/services/spring-integration/pagination/spring-datatable-pagination.service';
import { RelatorioAutuacaoAgenteService } from './relatorio-autuacao-agente.service';
import { NotificationsService } from 'angular2-notifications';
import { ExportCsvService } from '../../../shared/services/export-csv.service';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePtBr);
@Component({
  selector: 'ngx-relatorio-autuacao-agente',
  templateUrl: './relatorio-autuacao-agente.component.html',
  styleUrls: ['./relatorio-autuacao-agente.component.scss']
})
export class RelatorioAutuacaoAgenteComponent implements OnInit, OnDestroy {

  public formrelatorioAutuacaoAgente = null;
  public rowData = null;
  public tableLimit = 10;
  public exportar = null;
  public columnsTabe = null;

  @ViewChild('myTable', null)
  public myTable: DatatableComponent;

  datatablePagination: SpringDatatablePagination = new SpringDatatablePagination();

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private datatableService: DatatableService,
    private service: RelatorioAutuacaoAgenteService,
    private paginationService: SpringDatatablePaginationService,
    private notifications: NotificationsService,
    private exportCsvService: ExportCsvService,

  ) {
    this.rowData = [];
    this.paginationService.setDatatablePagination(this.datatablePagination);
   
  }

  ngOnInit() {

    this.datatableService.subscribeTable(this.myTable);

    this.formrelatorioAutuacaoAgente = this.formBuilder.group({
      agente: [null],
    });

  }

  ngOnDestroy() {
    this.datatableService.unsubscribeTable(this.myTable)
  }

  pesquisarAgente(data?: any, page?: string) {

    let params = new HttpParams();

    params = params.append('size', String(this.tableLimit));

    if (page) {
      params = params.append('page', page);
    }

    if (data) {
      if (data.agente != null) {
        params = params.append('usuarioId', data.agente);
      }      
    }

    this.service.buscaInfracao(params, (response => {

      this.rowData = response.content
      console.log(this.rowData)
      this.rowData = this.rowData.map((data) => {
        
        return {
          id: data.id,
          nome: data.usuario.nome,
          matricula: data.usuario.matricula,
          placa: data.veiculo.placa,
          valor: data.infracao.valorMulta,
          dataHoraInfracao: moment(data.dataHoraInfracao).format('DD/MM/YYYY'),
                  
        }

      });

      this.paginationService.setInfo(response)

    }), null);


  }

  buscarExtratoTotal(){

    let params = new HttpParams();

    params = params.append('allElements', 'true');

    this.service.buscaInfracao(params, (response => {

      this.rowData = response.content;
      this.exportar = response.content.length;

      this.rowData = this.rowData.map((data) => {
        
        return {
         
          nome: data.usuario.nome,
          cpf: data.usuario.cpf,
          matricula: data.usuario.matricula,
          sexo: data.usuario.sexo, 
          email: data.usuario.email,
          dataAtualizacao: moment(data.usuario.dtAtualizacao).format('DD/MM/YYYY'),
          dataCadastro: moment(data.usuario.dtCadastro).format('DD/MM/YYYY'),
          razaoSocial: data.cliente.razaoSocial,
          nomeFantasia: data.cliente.nomeFantasia,
          cpfCnpj: data.cliente.cpfCnpj,
          emailCliente: data.cliente.emailCliente,
          qtdAgentes: data.cliente.qtdAgentes,
          nomeResposavel: data.cliente.nomeResposavel,
          rua: data.cliente.rua,
          numero: data.cliente.numero,
          bairro: data.cliente.bairro,
          complemento: data.cliente.complemento,
          cep: data.cliente.cep,
          cidade: data.cliente.cidade,
          estado: data.cliente.estado,
          dataVigencia: moment(data.cliente.dtVigencia).format('DD/MM/YYYY'),
          dataCadastroCliente: moment(data.cliente.dtCadastro).format('DD/MM/YYYY'),        
          nomeCondutor: data.condutor.nome,
          cpfCondutor:  data.condutor.cpf,
          nrCnh:  data.condutor.nrCnh,
          descricao:  data.condutor.status.descricao,
          dataCadastroCondutor: moment(data.condutor.status.dtCadastro).format('DD/MM/YYYY'),
          ufCondutor:  data.condutor.uf.descricao,
          dataHoraInfracao: moment(data.dataHoraInfracao).format('DD/MM/YYYY'),
          dataRegistro: moment(data.dataRegistro).format('DD/MM/YYYY'),
          descricaoCondutor: data.descricao,          
          dataAfericao: data.dtAfericao,
          artigoCategoria: data.infracao.artigoCategoria,
          artigoCtb: data.infracao.artigoCtb,
          codigoInfracao: data.infracao.codigoInfracao,
          descricaoInfracao: data.infracao.descricaoInfracao,
          medidaAdmistrativa: data.infracao.medidaAdmistrativa,
          responsavel: data.infracao.responsavel,
          valorMulta: data.infracao.valorMulta,
          instrumentoApuracao: data.instrumentoApuracao,
          limiteRegulamentado: data.limiteRegulamentado,
          logradouro: data.logradouro,
          medidaRealizada: data.medidaRealizada,
        
          nrKm: data.nrKm,
          descricaoStatus: data.status.descricao,
          dataInfracao: moment(data.status.dtCadastro).format('DD/MM/YYYY'),
          tipoAssinatura: data.tipoAssinatura,
          //descInfracao: data.uf.descricao,
          valorConsiderado: data.valorConsiderado,
          descVeiculo: data.veiculo.cor.descricao,
          dataCadastroVeiculo: moment(data.veiculo.dtCadastro).format('DD/MM/YYYY'),
          descricaoEspecie: data.veiculo.especie.descricao,
          descricaoFabricante: data.veiculo.fabricante.descricao,          
          dtCadastro: moment(data.veiculo.fabricante.dtCadastro).format('DD/MM/YYYY'),
          descModelo: data.veiculo.modelo.descricao,
          municipio: data.veiculo.municipio.codMunicipio,
          descCidade: data.veiculo.municipio.descricao,
          descUF: data.veiculo.municipio.uf.descricao,
          nrChassi: data.veiculo.nrChassi,
          nrRenavam: data.veiculo.nrRenavam,
          descPais: data.veiculo.pais.descricao,
          placa: data.veiculo.placa,
          descTipo: data.veiculo.tipo.descricao,
          descCyt: data.veiculo.descricao
        }

      });

      if (this.exportar == 0) {
        this.notifications.warn('Não há dados para exportar!');
      } else {
        this.exportCsvService.exportCsv(this.rowData, this.columnsTabe, ',', 'autuacaoAgente');
      }
      console.log(this.rowData)

    }), error => {
      this.notifications.error(error.message);
    });

  }
  previousPage() {
    this.router.navigate(['/dashboard']);
  }
}
