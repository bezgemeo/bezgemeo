import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from "../services/storage.service";
import {AuthService} from "../services/auth.service";
import {loggedIn} from "@angular/fire/auth-guard";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }


  private checkLogin(url: string): any {
    if(url.includes('home')) {
      this.router.createUrlTree(['/home']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}