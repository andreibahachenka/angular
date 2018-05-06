import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class SpecialQuizzesPageService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getQuizzes(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getSpecialQuizzesEndpoint}`, data,
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

    public setQuiz(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.createSpecialQuizEndpoint}`,
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

    public updateQuiz(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.updateSpecialQuizEndpoint}`,
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

}
