import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { omitBy, isEmpty } from 'lodash';

import { LocalStorageConfig } from '../../app-config/locastorage.config';
import { NotificationService } from './notification.service';

const message = 'Error loading data';

@Injectable()
export class RestApiService {

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService,
    ) {
    }

    public getItems(url: string,  params?: any, errorCallback?): Observable<any> {
        const isParamString = typeof params === 'string';
        const queryUrl = isParamString ? `${url}?${params}` : url;

        return new Observable((observer) => {
            this.http.get(queryUrl,!isParamString ? {
                params: this.createParams(params),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                }
            }: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                }
            })
                .subscribe(
                (response) => {
                    observer.next(response);
                },
                (err) => {
                    if (errorCallback) {
                        errorCallback(err);
                    } else {
                        this.notificationService.error(message);
                        console.error(err);
                    }
                    observer.error(err);
                });
        }).first();
    }

    public postItem(url: string, body?: any, errorCallback?): Observable<any> {
        if (body instanceof FormData) {
            return new Observable((observer) => {
                this.http.post(url, body,
                    { headers:
                        {
                            'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                        }
                    })
                    .subscribe(
                        (response) => {
                            observer.next(response);
                        },
                        (err) => {
                            if (errorCallback) {
                                errorCallback(err);
                            } else {
                                this.notificationService.error(message);
                                console.error(err);
                            }
                            observer.error(err);
                        });
            }).first();

        } else {
            return new Observable((observer) => {
                this.http.post(url, body,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                        }
                    })
                    .subscribe(
                        (response) => {
                            observer.next(response);
                        },
                        (err) => {
                            if (errorCallback) {
                                errorCallback(err);
                            } else {
                                this.notificationService.error(message);
                                console.error(err);
                            }
                            observer.error(err);
                        });
            }).first();
        }
    }

    public deleteItem(url: string, body: any, errorCallback?: any): Observable<any> {
        return new Observable((observer) => {
            this.http.post(url, body,
                { headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                    }
                })
                .subscribe(
                    (response) => {
                        observer.next(response);
                    },
                    (err) => {
                        if (errorCallback) {
                            errorCallback(err);
                        } else {
                            this.notificationService.error(message);
                            console.error(err);
                        }
                        observer.error(err);
                    });
        }).first();
    }

    public updateItem(url: string, body: string, errorCallback?: any): Observable<any> {
        return new Observable((observer) => {
            this.http.put(url, body,
                { headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(LocalStorageConfig.token)}`
                    }
                })
                .subscribe(
                    (response) => {
                        observer.next(response);
                    },
                    (err) => {
                        if (errorCallback) {
                            errorCallback(err);
                        } else {
                            this.notificationService.error(message);
                            console.error(err);
                        }
                        observer.error(err);
                    });
        }).first();
    }

    private createParams(paramsObject: any): any {
        return !paramsObject ? null : omitBy(paramsObject, (propValue) => {
            return propValue === ''
                || propValue === undefined
                || propValue === null
                || (typeof propValue === 'object' && isEmpty(propValue));
        });
    }
}
