import { AuthenticationService } from '../shared/services/authentication.service';
import { Injectable } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root',
   })
export class PagesService {

  public role = null;
  constructor(
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService

  ) {

    this.role = localStorage.getItem('bway-roles').split(',');
   
   }

   reloadMenus() {  
    this.setHidden(MENU_ITEMS);
  }

  async setHidden(menus) {
    
    await  menus.forEach(menu => {
     
      if (menu.data) {
                
        let hasRole = this.role.indexOf(menu.data.roles.toString()) >= 0;
    
      if (hasRole) {
        menu['hidden'] = false;               
      }else {
        menu['hidden'] = true;
      }
        if (menu['children'] && menu['children'].length > 0) {
          this.setHidden(menu['children']);
        }
      }
    });
    this.spinner.hide();

  }

}
