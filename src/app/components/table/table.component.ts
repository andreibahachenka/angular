import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    ngOnInit() {
        this.columns = [
            { name : 'Name'},
            { name : 'Username'},
            { name : 'Surname'},
            { name : 'Email'},
            { name : 'Phone'},
            { name : 'Status'},
            { name : 'Points'}
        ];
    }

    public openEdit(item: any): void {
        this.onEdit.emit(item);
    }

    public openDelete(item: any): void {
        this.onDelete.emit(item);
    }
}
