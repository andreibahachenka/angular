import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/';

import { PathConfig } from 'app-config';
import { omitBy, isEmpty } from 'lodash';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class RestApiService {

    constructor(
        private http: HttpClient,
    ) {
    }
    private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    public getItems(url: string,  params?: any, errorCallback?): Observable<any> {
        const isParamString = typeof params === 'string';
        const queryUrl = isParamString ? `${url}?${params}` : url;

        return new Observable((observer) => {
            this.http.get(queryUrl, !isParamString ? { params: this.createParams(params)} : {})
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
        // let headers = new HttpHeaders();
        // headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

        return new Observable((observer) => {
            this.http.post(url, body, { headers: {'Content-Type': 'application/json'} })
                .subscribe(
                (response) => {
                    console.log('response', response);
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

    public deleteItem(url: string, errorCallback?: any): Observable<any> {
        return new Observable((observer) => {
            this.http.delete(url)
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

    private createParams(paramsObject: any): any {
        return !paramsObject ? null : omitBy(paramsObject, (propValue) => {
            return propValue === ''
                || propValue === undefined
                || propValue === null
                || (typeof propValue === 'object' && isEmpty(propValue));
        });
    }
}
