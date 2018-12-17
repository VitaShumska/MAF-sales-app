import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
