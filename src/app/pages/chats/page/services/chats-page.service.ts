import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class ChatsPageService {

    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getChats(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getChatsEndpoint}`, data,
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

    public getMessages(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getMessagesEndpoint}`, data,
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

    public sendMessage(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.sendMessageEndpoint}`,
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

    public sendMessageAll(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.sendMessageAllEndpoint}`,
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

    public markChat(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.markChatEndpoint}`,
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
