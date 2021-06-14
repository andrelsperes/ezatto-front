import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../shared/services/http/http-client.service';

const API = environment.url_server;

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  constructor(
    private httpService: HttpService
  ) { }

  createUser(data: any, successHandle: Function, errorHandle: Function) {

    return this.httpService.doPost('/usuario', data, successHandle, errorHandle);

  }

  buscaUser(path:any, data: any, successHandle:Function, errorHandle:Function) {

    this.httpService.doGet('/usuario?'+path, data, successHandle, errorHandle);

  } 


}
