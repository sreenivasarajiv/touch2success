import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private static user = null;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (AuthGuard.user && AuthGuard.user.email)
      return true;

    const token = localStorage.getItem('token');
    if (!token)
      return false;

    const user = jwt_decode(token);
    if (!user)
      return false;

    if (!user.email || !user.name)
      return false;

    AuthGuard.user = user;

    return true;
  }

}
