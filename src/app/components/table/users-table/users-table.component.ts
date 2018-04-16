import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'users-table-component',
    styleUrls: ['users-table.component.scss'],
    templateUrl: 'users-table.component.html'
})
export class UsersTableComponent {
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
