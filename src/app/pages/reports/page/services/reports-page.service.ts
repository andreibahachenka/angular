import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class ReportsPageService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getSpecialQuizzesForReport(params?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getSpecialQuizzesReportEndpoint}`, params,
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

    public getGamesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getGamesReportEndpoint}`, data,
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

    public getLotteriesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getLotteriesReportEndpoint}`, data,
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
