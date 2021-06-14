import { Injectable } from '@angular/core';
import { HttpService } from '../../../../shared/services/http/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ListaClienteService {

  constructor(
    private httpService: HttpService
  ) { }

  buscaCliente(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/cliente', data, successHandle, errorHandle);

  } 
  
 


}
