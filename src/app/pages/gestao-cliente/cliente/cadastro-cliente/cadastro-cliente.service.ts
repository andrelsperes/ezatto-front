import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../shared/services/http/http-client.service';

const API = environment.url_server;

@Injectable({
  providedIn: 'root'
})
export class CadastroClienteService {

  constructor(private httpService: HttpService) { }

  createCliente(data: any, successHandle: Function, errorHandle: Function) {

    return this.httpService.doPost('/cliente', data, successHandle, errorHandle);

  }

  buscaClien(path:any, data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/cliente?'+path, data, successHandle, errorHandle);

  } 

  buscaEstado(data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/localidade/uf',data, successHandle, errorHandle);

  } 

  buscaCidade(path:any, data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/localidade/cidade?'+path, data, successHandle, errorHandle);

  } 

}
