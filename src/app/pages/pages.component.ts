import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { EncriptyUtilService } from '../shared/services/encripty-util.service';

import { MENU_ITEMS } from './pages-menu';
import { PagesService } from './pages.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = [];
  level = 0;

  constructor(private authService: AuthenticationService, 
              private pageService: PagesService) {
    this.menu = MENU_ITEMS;
    this.pageService.setHidden(this.menu);
  }
}
