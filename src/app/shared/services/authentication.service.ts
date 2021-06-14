import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const API_LOGIN = environment.url_login;
const API = environment.url_login;

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }
  
  getToken(login, password): Observable<any> {
      const loginForm = {
        login: login,
        password: password,
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
          })
      };
      
      return this.http.post<any>(API_LOGIN + '/auth/token', loginForm, httpOptions);

  }

  isLoggedIn(): Observable<any> {
    var token = localStorage.getItem('bway-token');
    return this.http.get(API_LOGIN + '/auth/token/validateToken?token=' + token);

  }

  doLogout() {
    
    var token = String(localStorage.getItem('bway-token'));
    token = token.replace('"', '').replace('"', '');
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');  
    localStorage.clear();        
    this.router.navigate(['/login']);  
     
  }

 
  roleVerify(roles: any): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('roles', roles);
    return this.http.get(API_LOGIN + '/services/auth/roleVerify', {params});

  }

}
