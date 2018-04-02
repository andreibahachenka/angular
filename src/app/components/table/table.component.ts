import { Component, Input, ViewChild, TemplateRef, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];

    constructor(
    ){
    }

    public photos = [];

    ngOnInit() {
        this.columns = [
            { name : 'Id'},
            { name : 'Name'},
            { name : 'Username'},
            { name : 'Surname'},
            { name : 'Phone'},
            { name : 'Email'},
            { name : 'Status'},
            { name : 'Points'},
            { name : 'Shop_id'},
            { name : 'City_id'},];
    }

    ngOnChanges() {
    }
}
