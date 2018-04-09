import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from './../../../services';
import { PathConfig } from './../../../../app-config/path.config';
import { NotificationService } from './../../../services/notification.service';

const errorMessage = 'The user name or password is incorrect';

@Injectable()
export class LoginService {

    @ViewChild('applogin') applogin: ElementRef;
    @ViewChild('apppassword') apppassword: ElementRef;

    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public loginTo(login, password): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.authEndpoint}`,
                JSON.stringify({
                    username: login.value,
                    password: password.value,
                }),
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                },
                    (err) => {
                    observer.error(err);
            });
        })
    }

}
