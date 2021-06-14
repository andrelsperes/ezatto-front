import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { EncriptyUtilService } from '../services/encripty-util.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  public userRoles: Array<any> = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (route.data.roles && route.data.roles.length > 0) {
       let roleList = route.data.roles.map(role => role);
        return this.authService.roleVerify(roleList)
        .toPromise()
        .then((res) => {
          if (res.hasPermision === true) {
            return true;
          }else {
            localStorage.clear();
            this.router.navigate(['/login']);
            return false;
          }
        })
        .catch(() => {
          this.router.navigate(['/login']);
          return false;
        });
    }else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }

 /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isLoggedIn()
      .toPromise()
      .then((res) => {
        return true;
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return false;
      });
  }*/

 /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.getRoles()
      .toPromise()
      .then((res) => {
       this.saveRoles(res);
        return this.validateRoles(route);
      })
      .catch(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      });
  }

  saveRoles(roles) {
    this.userRoles = roles;
  }*/

  validateRoles(route: ActivatedRouteSnapshot) {
    if (route.data.roles && route.data.roles.some(role => this.userRoles.indexOf(role) > 0) === false) {
      localStorage.clear();
      this.router.navigate(['/login']);

      return false;
    }
    return true;
  }

}
