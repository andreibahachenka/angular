import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilsService {
    constructor() {
    }

    public getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}
