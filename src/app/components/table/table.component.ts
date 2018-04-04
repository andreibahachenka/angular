import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];

    constructor(
    ){
    }

    ngOnInit() {
        this.columns = [
            { name : 'Name'},
            { name : 'Username'},
            { name : 'Surname'},
            { name : 'Phone'},
            { name : 'Email'},
            { name : 'Status'},
        ];
    }
}
