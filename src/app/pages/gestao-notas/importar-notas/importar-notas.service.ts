import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ImportarNotasService {

  constructor(
    private httpService: HttpService
  ) { }

  uploadNota(data: any, successHandle: Function, errorHandle: Function) {

    return this.httpService.doPost('/nota', data, successHandle, errorHandle);

  }

}
