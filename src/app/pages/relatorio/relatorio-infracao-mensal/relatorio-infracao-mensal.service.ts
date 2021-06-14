import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class RelatorioInfracaoMensalService {

  constructor(
    private httpService: HttpService
  ) { }

  buscaInfracao(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/autuacao/findAutuacaoByStatusAndUsuarioId', data, successHandle, errorHandle);

  }   
  
}
