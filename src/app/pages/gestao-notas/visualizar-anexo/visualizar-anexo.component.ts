import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { VisualizarAnexoService } from './visualizar-anexo.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatatableService } from '../../../shared/services/datatable.service';


@Component({
  selector: 'ngx-visualizar-anexo',
  templateUrl: './visualizar-anexo.component.html',
  styleUrls: ['./visualizar-anexo.component.scss'],
})

export class VisualizarAnexoComponent implements OnInit {


  @ViewChild('myTable', null)
  public myTable: DatatableComponent;

  public idAutuacao = null;
  public imagem = null;
  public rowData = null;
  public tableLimit = 15;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private service: VisualizarAnexoService,
    private notifications: NotificationsService,
    private spinnerService: NgxSpinnerService,
    private encriptyService: EncriptyUtilService,
    private datatableService: DatatableService,
  ) {

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.idAutuacao = this.encriptyService.decriptyBySecretKey(params.get('id'));
    });

    let params = new HttpParams();

    params = params.append('idAutuacao', this.idAutuacao)

    this.spinnerService.show();

    this.service.autuacaoAnexo(params, (response => {
      this.rowData = response
      this.spinnerService.hide();

    }), (error) => {
      this.spinnerService.hide();
      this.notifications.error(error.message);
    });

  }

  ngOnInit() {

    this.datatableService.subscribeTable(this.myTable)
   
  }

  ngOnDestroy() {
    this.datatableService.unsubscribeTable(this.myTable)
  }


  visualizarAutuacao(data) {  

    let imagem = data.anexo;
    
    const blobURL = URL.createObjectURL(this.pdfBlobConversion(imagem, 'image/png'));
    const theWindow = window.open(blobURL);
    const theDoc = theWindow.document;
    const theScript = document.createElement('script');
    function injectThis() {
      window.print();
    }
    theScript.innerHTML = 'window.onload = ${injectThis.toString()};';
    theDoc.body.appendChild(theScript);

  }

  pdfBlobConversion(b64Data, contentType) {
    
    contentType = contentType || '';
    var sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    var byteCharacters = window.atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset = offset + sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });

    return blob;

  }

  previousPage() {
    this.location.back();
  }

}
