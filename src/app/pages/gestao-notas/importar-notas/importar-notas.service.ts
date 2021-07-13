import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ImportarNotasService {

  constructor(
    private httpService: HttpService
  ) { }

  buscaInfracao(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/autuacao/findById', data, successHandle, errorHandle);

  }
  autuacaoAnexo(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/autuacao/anexo', data, successHandle, errorHandle);

  }
  createAutuacao(data: any, successHandle: Function, errorHandle: Function) {

    return this.httpService.doPost('/autuacao', data, successHandle, errorHandle);

  }
  setaParecer(data: any, successHandle: Function, errorHandle: Function) {

    return this.httpService.doPost('/autuacao/setaParecer', data, successHandle, errorHandle);

  }

}
