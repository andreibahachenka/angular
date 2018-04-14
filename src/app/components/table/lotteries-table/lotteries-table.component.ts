import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lotteries-table-component',
    styleUrls: ['./lotteries-table.component.scss'],
    templateUrl: './lotteries-table.component.html'
})
export class LotteriesTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    public openEdit(item: any): void {
        this.onEdit.emit(item);
    }

    public openDelete(item: any): void {
        this.onDelete.emit(item);
    }
}
