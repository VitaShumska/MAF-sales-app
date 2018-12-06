import { NgModule, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Routes, Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegmentGroup, Params, ParamMap } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    const token = localStorage.getItem('token') != null;
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
