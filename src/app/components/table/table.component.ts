import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onOpenEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onOpenDelete: EventEmitter<any> = new EventEmitter<any>();

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

    public openDelete(item: any): void {
        this.onOpenDelete.emit(item);
    }

    public openEdit(item: any): void {
        this.onOpenEdit.emit(item);
    }
}
