import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../shared/services/http/http-client.service';

const API = environment.url_server;

@Injectable({
  providedIn: 'root'
})
export class ListaClienteService {

  constructor(
    private httpService: HttpService
  ) { }
 
  buscaUser(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/usuario', data, successHandle, errorHandle);

  } 


}
