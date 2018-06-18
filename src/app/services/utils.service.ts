import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PathConfig } from '../../app-config/path.config';
import { RestApiService } from './rest-api.service';

@Injectable()
export class UtilsService {
    constructor(
        private restApiService: RestApiService,
    ) {
    }

    public getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    public addLog(data): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.addLogEndpoint}`,
                JSON.stringify(data),
                (err) => {
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }
}
