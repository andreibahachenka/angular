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
export class TableComponent{
    @Input() public rows: any[] = [];

    constructor(
        private restApiService: RestApiService,
        private router: Router,
    ){
    }

    public ngOnChanges() {
        console.log('rows', this.rows);

    }

    // rows = [
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    //     { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    //     { name: 'Dany', gender: 'Male', company: 'KFC' },
    //     { name: 'Molly', gender: 'Female', company: 'Burger King' },
    // ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' },
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'status'},
        { name : 'shop_id'},
        { name : 'points'},
        { name : 'photo'},
        { name : 'phone'},
        { name : 'name'},
        { name : 'id'},
        { name : 'email'},
        { name : 'city_id'},


    ];

    // public getUsers() {
    //     this.restApiService.getItems(
    //         'http://46.30.42.15:8066/v1/admin/users?limit=&offset=&id=&email=&phone=&username=',
    //         (err) => {
    //             console.error(err);
    //         }
    //     ).first()
    //         .subscribe((res) => {
    //             console.log(res);
    //             // localStorage.getItem(LocalStorageConfig.token);
    //         });
    // }
}
