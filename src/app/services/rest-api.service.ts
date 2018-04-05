import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';

import { LocalStorageConfig } from '../../app-config/locastorage.config';

@Injectable()
export class RestApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    public getItems(url: string,  params?: any, errorCallback?): Observable<any> {
        const isParamString = typeof params === 'string';
        const queryUrl = isParamString ? `${url}?${params}` : url;

        return new Observable((observer) => {
            this.http.get(queryUrl,
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
                        console.error(err);
                    }
                    observer.error(err);
                });
        }).first();
    }

    public postItem(url: string, body?: any, errorCallback?): Observable<any> {
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
                        console.error(err);
                    }
                    observer.error(err);
                });
        }).first();
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
                            console.error(err);
                        }
                        observer.error(err);
                    });
        }).first();
    }
}
