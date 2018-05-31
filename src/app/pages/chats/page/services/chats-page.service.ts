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

    public getSettings(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.getItems(
                `${PathConfig.getSettingsEndpoint}`, data,
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

    public updateSettings(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.updateSettingEndpoint}`,
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


    public getUsers() : Observable<string[]> {
        return this._http.get('/v1/users/all', { headers: this.getHeaders() })
            .map(res => res.json())
            .catch();
    }

    public getSenderUsers(request: any) : Observable<Response> {
        return this._http.post('admin/senders/get', request)
            .map(res => res.json())
            .catch();
    }

    public sendAllUsers(request: any) : Observable<Response> {
        return this._http.post('admin/senders/sendAll', request)
            .map(res => res.json())
            .catch();
    }

    public getChatById(request: any) : Observable<Response> {
        return this._http.get('/v1/chats/' + request.chatId + '?offset=' + request.offset + '&limit=' + request.limit, {headers: this.getHeaders()}).map(res => res.json());
    }

    public getChats(request: any) {
        return this._http.post('/conversations/all', {}, {headers: this.getHeaders()}).map(res => res.json());
    }

    public getMessages(request: any) {
        return this._http.post('/messages', request, {headers: this.getHeaders()}).map(res => res.json());
    }

    public sendMessage(request: any) : Observable<Response> {
        return this._http.post('/messages/send', request, {headers: this.getHeaders()}).map(res => res.json());
    }

    public getNewMessages(request: any) : Observable<Response> {
        // return this._http.get('/v1/chats/'+ request.chatId + '/new?id=' + request.id, {headers: this.getHeaders()}).map(res => res.json());
    }

    public seenNewMessages(request: any) : Observable<Response> {
        // return this._http.post('/v1/messages/seen/all', request, {headers: this.getHeaders()}).map(res => res.json());
    }
}
