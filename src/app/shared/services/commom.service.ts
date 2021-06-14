import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const API = environment.url_server;

@Injectable()
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }
  

}
