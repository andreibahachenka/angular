import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class LotteriesPageService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getAdministrator(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getAdministratorsEndpoint}`, data,
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

    public setAdministrator(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.createAdministratorEndpoint}`,
                JSON.stringify(data),
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

    public updateAdministrator(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.updateAdministratorEndpoint}`,
                JSON.stringify(data),
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.log(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public deleteAdministrator(data): Observable<any> {
        let dataToDelete = {
            id: data
        };
        return new Observable((observer) => {
            this.restApiService.deleteItem(
                `${PathConfig.removeAdministratorEndpoint}`,
                JSON.stringify(dataToDelete),
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.log(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

}
