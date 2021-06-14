import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  private toggle:boolean = true;

  isToggle():boolean{
      return this.toggle;
  }

  setToggle(data:boolean){
    this.toggle = data;
  }
}
