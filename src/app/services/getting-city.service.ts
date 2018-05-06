import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { PathConfig } from '../../app-config/path.config';
import { NotificationService, RestApiService } from './';

const errorMessage = 'Error loading data';

@Injectable()
export class GettingCityService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getCity(): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getCityEndpoint}`,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

}
