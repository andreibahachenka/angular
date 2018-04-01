import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageConfig } from "../../app-config/locastorage.config";
import { RoutesConfig } from "../../app-config/routes.config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ){
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
            if (localStorage.getItem(LocalStorageConfig.token) != null)
                return true;
            this.router.navigate([RoutesConfig.login]);
            return false;

    }
}
