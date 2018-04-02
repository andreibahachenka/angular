import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from './../../services';
import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { RoutesConfig } from '../../../app-config/routes.config';
import { LoginService } from './services/login.service';


@Component({
    selector: 'login-component',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public enter: string = 'Sign In';

    @ViewChild('applogin') applogin: ElementRef;
    @ViewChild('apppassword') apppassword: ElementRef;


    constructor(
        private restApiService: RestApiService,
        private router: Router,
        private loginService: LoginService,
    ){
    }

    public login(login, password) {
        this.loginService.loginTo(login, password)
            .subscribe((res) => {
                    localStorage.setItem(LocalStorageConfig.token, res.token);
                    this.router.navigate([RoutesConfig.startAdminRoute]);
                },
                (err) => {
                    this.applogin.nativeElement.className = "wrongData";
                    this.apppassword.nativeElement.className = "wrongData";
                    console.error(err);
                })
    }
}
