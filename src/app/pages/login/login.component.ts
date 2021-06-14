import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { EncriptyUtilService } from '../../shared/services/encripty-util.service';
import * as CriptoJS from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 
  public loginForm: FormGroup;
  public forgotPassForm: FormGroup;
  public role = null;
  roles =  [];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private encriptyService: EncriptyUtilService,
    private formBuilder: FormBuilder,
    private notifications: NotificationsService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,

  ) { 

    this.forgotPassForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });       

  }

  login() {
    let usuario = this.loginForm.controls['login'].value;
    let password = this.loginForm.controls['password'].value;

    this.spinnerService.show();

   this.authenticationService.getToken(usuario, password)
    .subscribe(      
      re => this.saveLogin(re),     
      (error) => {
        this.spinnerService.hide();
        this.notifications.error(error.error.message)      
      }); 

  }

  private saveLogin(result) {
    
    this.spinnerService.hide();
   
    let role = result.roles;

    localStorage.setItem('bway-role', result.dominioId);   
    localStorage.setItem('bway-token', result.token);
    localStorage.setItem('bway-logged-date', new Date().toString());
    localStorage.setItem('bway-roles', role);

    if(result.dominioId === 1){

      localStorage.setItem('bway-enterprise-name',  this.encriptyService.encriptyBySecretKey(result.nomeCliente));

    }else if((result.dominioId === 2) || (result.dominioId === 3) || (result.dominioId === 4)){

      localStorage.setItem('bway-enterprise-name',  this.encriptyService.encriptyBySecretKey(result.login));

    }
             
    this.router.navigate(['/pages/dashboard']);

  }
 

}