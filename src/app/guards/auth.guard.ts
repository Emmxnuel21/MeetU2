import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
=======
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
>>>>>>> 8f7dddc823bce4fd5ac2740a48f45b6101616487
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
<<<<<<< HEAD
    State: RouterStateSnapshot): boolean{
      return this.DbserviceService.isAuthenticated();
    }
=======
    state: RouterStateSnapshot): boolean {
    return this.DbserviceService.isAuthenticated();
>>>>>>> 8f7dddc823bce4fd5ac2740a48f45b6101616487
  }
  

