import { Component, OnInit } from '@angular/core';

import { RestApiService } from './../../services/rest-api.service';
import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { PathConfig } from '../../../app-config/path.config';
import { Router } from '@angular/router';


@Component({
    selector: 'login-component',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    public enter: string = 'Sign In';

    constructor(
        private restApiService: RestApiService,
        private router: Router,
    ){
    }

    public login(login, password) {
        this.restApiService.postItem(
            'http://46.30.42.15:8066/v1/admin/auth',
            JSON.stringify({
                username: login.value,
                password: password.value,
            }),
            (err) => {
                console.log(JSON.stringify({
                    username: login.value,
                    password: password.value,
                }));
                console.log('header', err.headers);
                console.error(err);
            }
        ).first()
            .subscribe((res) => {
            console.log(res);
                localStorage.setItem(LocalStorageConfig.token, res.token);
                this.router.navigate([PathConfig.adminUrl]);
            });
    }
}
