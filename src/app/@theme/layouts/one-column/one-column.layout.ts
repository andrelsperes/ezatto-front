import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../pages/login/login.service';
import { LayoutService } from '../../../@core/utils';
import { OneColumnService } from './one-column.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html'
})
export class OneColumnLayoutComponent implements OnInit {

  @ViewChild("sidebar",null)
  private sidebar;

  constructor(
    private loginService:LoginService,
    private layoutService: LayoutService,
    private oneColumnService: OneColumnService,
    private sidebarService:NbSidebarService){



  }

  toggle(){
    this.sidebar.state = 'expanded';
    this.layoutService.changeLayoutSize();
  }

  ngOnInit() {
      if(localStorage.getItem('bway-product-id')!=='null'){
        this.sidebar.state = 'expanded';
      }else{
        this.sidebar.state = 'collapsed';
      }

      this.layoutService.changeLayoutSize();


  }


}
