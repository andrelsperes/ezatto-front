import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class VisualizarAnexoService {

  constructor(
    private httpService: HttpService
  ) { }

  buscaInfracao(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/autuacao/findById', data, successHandle, errorHandle);

  }   

  autuacaoAnexo(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/autuacao/anexo', data, successHandle, errorHandle);

  }   
  
}
