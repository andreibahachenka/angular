import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'administrators-table-component',
    styleUrls: ['./administrators-table.component.scss'],
    templateUrl: './administrators-table.component.html'
})
export class AdministratorsTableComponent {
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
