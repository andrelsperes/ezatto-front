import { Injectable } from '@angular/core';
import { RequestOptions } from 'http';
//import {Headers, RequestOptions} from "@angular/common/http";
@Injectable()
export class RestService {
  private host;
  constructor() {}

  requestOptions: RequestOptions;

  setHost(host) {
	localStorage.setItem("API_URL",host);
    this.host = host;
  }
  
  getHost() {
    return this.host;
  }

  public getToken(){
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user.token;
  }
  public getCgc(){
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user.cgc;
  }
  public getMemberId(){
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user.memberId;
  }
  public getDominio(){
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user.dominio;
  }

	public getSessionToken(){
	
		var token = String(localStorage.getItem('token'));
			token = token.replace('"','').replace('"','');

		return token;
	}

}
