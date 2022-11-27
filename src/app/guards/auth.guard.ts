import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { Observable } from 'rxjs';
import { DbserviceService } from '../services/dbservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    public DbserviceService: DbserviceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    State: RouterStateSnapshot): boolean{
      return this.DbserviceService.isAuthenticated();
    }
  }
  

