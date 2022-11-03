import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from '../services/dbservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      public DbserviceService: DbserviceService,
      public router: Router
    ){}

  canActivate(): boolean {
    return this.DbserviceService.isAuthenticated();
  }
  
}
