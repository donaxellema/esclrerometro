import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenadminService } from '../services/tokenadmin.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor( public router: Router,
    private _tokenAdminService:TokenadminService,
  ) { }

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
     /* this._tokenAdminService.cargarValoresLocalStorage();
      var token = this._tokenAdminService.myToken;
      console.log(token.token);
      if(!this._tokenAdminService.validarExpiracionToken(token.token)){
        return true;
      }else{
       this.router.navigate(['auth/login']);
        return false;
      }  */ 
  }
  
}
