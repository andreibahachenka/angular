import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from './../../services';
import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { RoutesConfig } from '../../../app-config/routes.config';
import { LoginService } from './services/login.service';
import { UtilsService } from '../../services/utils.service';


@Component({
    selector: 'login-component',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public enter: string = 'Sign In';
    public checkInput: boolean = false;

    @ViewChild('applogin') applogin: ElementRef;
    @ViewChild('apppassword') apppassword: ElementRef;

    constructor(
        private restApiService: RestApiService,
        private router: Router,
        private loginService: LoginService,
        private utilsService: UtilsService
    ){
    }

    public login(login, password): void {
        this.loginService.loginTo(login, password)
            .subscribe((res) => {
                    localStorage.setItem(LocalStorageConfig.token, res.token);
                    console.log('login');
                    this.utilsService.addLog({action: 'login'}).subscribe();
                    this.utilsService.addLog({action: 'open_section', info: `Users`}).subscribe();
                    this.router.navigate([RoutesConfig.adminUsers]);
                },
                (err) => {
                    this.checkInput = true;
                    console.error(err);
                })
    }

    public checkKeyUp(): void {
       this.checkInput = false;
    }
}
