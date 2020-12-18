import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild  } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token')
       // tslint:disable-next-line: align
       if (token) {
        return true;
       }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
  }

  export class ChildGuard implements CanActivateChild{
    constructor(private authService: AuthService, private router: Router) { }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.getCurrentAdmin();
           // tslint:disable-next-line: align

          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === 1) {
              return true;
          }
        this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
        return false;
      }
  }


export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('currentAdmin')
           // tslint:disable-next-line: align
           if (token) {
            return true;
           }
          this.router.navigate(['/login/admin'], { queryParams: { returnUrl: state.url }});
          return false;
      }
}
export class AuthAdminFunctionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authService.getCurrentAdmin();
         // tslint:disable-next-line: align
         if (currentUser.role== 1) {
          return true;
         }
        this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
