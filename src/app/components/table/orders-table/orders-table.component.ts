import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'orders-table-component',
    styleUrls: ['orders-table.component.scss'],
    templateUrl: 'orders-table.component.html'
})
export class OrdersTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    public openDelete(item: any): void {
        this.onDelete.emit(item);
    }
}
