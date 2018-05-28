import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class OrdersPageService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getOrders(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getOrdersEndpoint}`, data,
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

    public setOrder(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.createOrderEndpoint}`,
                JSON.stringify(data),
                (err) => {
                    let errorMessageCoins = "You don't have enough coins";
                    this.notificationService.error(errorMessageCoins);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public deleteOrder(data): Observable<any> {
        let dataToDelete = {
            id: data
        };
        return new Observable((observer) => {
            this.restApiService.deleteItem(
                `${PathConfig.removeOrderEndpoint}`,
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
