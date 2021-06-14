import { Component, OnDestroy, OnInit, Inject, ViewChild, ViewChildren } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NB_WINDOW, NbIcon } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { EncriptyUtilService } from '../../../shared/services/encripty-util.service';
import { LoginService } from '../../../pages/login/login.service';
import { NotificationsService } from 'angular2-notifications';
import { DimensionsHelper } from '@swimlane/ngx-datatable';
import { DatatableService } from '../../../shared/services/datatable.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private isCardSelected: boolean = null;
  headerInformation = {
    productDescription: '',
    enterpriseName: '',
  };


  private toggle:boolean;
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  
  userMenu = [{ title: 'Sair' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authenticationService: AuthenticationService,
    private nbMenuService: NbMenuService,
    private encriptyService: EncriptyUtilService,
    private notifications: NotificationsService,
    private datatableService: DatatableService,
    private headerService: HeaderService,
    @Inject(NB_WINDOW) private window) {
      this.headerInformation.enterpriseName =
       this.encriptyService.decriptyBySecretKey(localStorage.getItem('bway-enterprise-name'));

      this.headerService.assignHeaderInformation(this.headerInformation);
    }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    let userName = this.encriptyService.decriptyBySecretKey(localStorage.getItem('bway-enterprise-name'));
    
    this.user = {
      name: userName,
      picture: 'assets/images/nick.png'
    }
    
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-user'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.userContexMenuSwitch(title));

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
 

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  doLogout() {
    this.authenticationService.doLogout();
  }

  toggleSidebar(toggle: boolean): boolean {

    let productId = this.encriptyService.decriptyBySecretKey(localStorage.getItem('bway-product-id'));

    if (productId !== 'null' ||  !isNaN(productId)){

      this.sidebarService.toggle(toggle, 'menu-sidebar');
      this.layoutService.changeLayoutSize();
      this.datatableService.resizeAllTables();
      
    }else {
      this.notifications.warn('Selecione um produto para acessar essa função.')
    }
    return false;

  }

  userContexMenuSwitch(title) {
    if (title === 'Sair') {
      this.doLogout();
    }
  }
}
