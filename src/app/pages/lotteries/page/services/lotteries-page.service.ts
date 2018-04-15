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

    public getLotteries(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getLotteriesEndpoint}`, data,
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

    public setLottery(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.createLotteryEndpoint}`,
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

    public updateLottery(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.updateLotteryEndpoint}`,
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

    public deleteLottery(data): Observable<any> {
        let dataToDelete = {
            id: data
        };
        return new Observable((observer) => {
            this.restApiService.deleteItem(
                `${PathConfig.removeLotteryEndpoint}`,
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
