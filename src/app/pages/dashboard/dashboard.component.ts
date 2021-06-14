import { Component, OnDestroy, OnInit } from '@angular/core';
import {  NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../@core/utils';
import { CommonService } from '../../shared/services/commom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ColorSchema } from '../../../assets/color-schema/color-schema';

registerLocaleData(localePtBr, 'pt-Br');

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  public formAutuacaoMes = null;
  public formAutuacaoDia = null;
  public formQtdaDia = null;
  public formMotivoInfracao = null;

  view: any[] = [1000, 400];


    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    quantidades = 'Quantidades';
    dia = 'Dias';
    mes = 'Mês';
    mesQdta = 'Quantidades';
    timeline = true;

    colorScheme = {
      domain: ColorSchema.picnic,
    };

  public autuacaoDiasRowData: Array<any> = [];
  public autuacaoMesRowData: Array<any> = [];
  public motivoInfracaoRowData: Array<any> = [];

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,

  ) {

    this.motivoInfracaoRowData = [

      {
        name: 'Produto 1',
        value: '25.0',
      },
      {
        name: 'Produto 2',
        value: '25.0',
      },
      {
        name: 'Produto 3',
        value: '25.0',
      },
      {
        name: 'Produto 4',
        value: '25.0',
      },


    ]

    this.autuacaoMesRowData = [

      {
        name: 'Janeiro',
        value: '2',
      },
      {
        name: 'Fevereiro',
        value: '5.0',
      },
      {
        name: 'Março',
        value: '10.0',
      },
      {
        name: 'Abril',
        value: '9.0',
      },
      {
        name: 'Maio',
        value: '6.0',
      },
      {
        name: 'Junho',
        value: '2.0',
      },
      {
        name: 'Julho',
        value: '5.0',
      },
      {
        name: 'Agosto',
        value: '8.0',
      },
      {
        name: 'Setembro',
        value: '12.0',
      },
      {
        name: 'Outubro',
        value: '13.0',
      },
      {
        name: 'Novembro',
        value: '14.0',
      },
      {
        name: 'Dezembro',
        value: '15.0',
      },


    ]

    this.autuacaoDiasRowData= [

      {
        name: '01',
        value: '2',
      },
      {
        name: '02',
        value: '15.0',
      },
      {
        name: '03',
        value: '25.0',
      },
      {
        name: '04',
        value: '5.0',
      },
      {
        name: '05',
        value: '35.0',
      },
      {
        name: '06',
        value: '10.0',
      },
      {
        name: '07',
        value: '1.0',
      },
      {
        name: '08',
        value: '7.0',
      },
      {
        name: '09',
        value: '9.0',
      },
      {
        name: '10',
        value: '11.0',
      },
      {
        name: '11',
        value: '18.0',
      },
      {
        name: '12',
        value: '1.0',
      },
      {
        name: '13',
        value: '16.0',
      },
      {
        name: '14',
        value: '1.0',
      },
      {
        name: '15',
        value: '20.0',
      },
      {
        name: '16',
        value: '21.0',
      },
      {
        name: '17',
        value: '22.0',
      },
      {
        name: '18',
        value: '18.0',
      },
      {
        name: '19',
        value: '6.0',
      },
      {
        name: '20',
        value: '7.0',
      },
      {
        name: '21',
        value: '9.0',
      },
      {
        name: '22',
        value: '6.0',
      },
      {
        name: '23',
        value: '5.0',
      },
      {
        name: '24',
        value: '4.0',
      },
      {
        name: '25',
        value: '9.0',
      },
      {
        name: '26',
        value: '3.0',
      },
      {
        name: '27',
        value: '15.0',
      },
      {
        name: '28',
        value: '19.0',
      },
      {
        name: '29',
        value: '15.0',
      },
      {
        name: '30',
        value: '2.0',
      }

    ]

  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }


}
