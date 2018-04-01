import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { RestApiService } from './../../services/rest-api.service';
import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { PathConfig } from '../../../app-config/path.config';
import { Router } from "@angular/router";


@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];

    constructor(
        // private restApiService: RestApiService,
        // private router: Router,
    ){
    }
}
