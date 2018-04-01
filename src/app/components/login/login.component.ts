import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { RestApiService } from './../../services';
import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { PathConfig } from '../../../app-config/path.config';
import { RoutesConfig } from '../../../app-config/routes.config';


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
    ){
    }

    public login(login, password) {
        this.restApiService.postItem(
            `${PathConfig.authEndpoint}`,
            JSON.stringify({
                username: login.value,
                password: password.value,
            }),
            (err) => {
                this.applogin.nativeElement.className = "wrongData";
                this.apppassword.nativeElement.className = "wrongData";
                console.error(err);
            }
        ).first()
            .subscribe((res) => {
                localStorage.setItem(LocalStorageConfig.token, res.token);
                this.router.navigate([RoutesConfig.startAdminRoute]);
            });
    }
}
