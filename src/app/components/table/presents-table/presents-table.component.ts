import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'presents-table-component',
    styleUrls: ['presents-table.component.scss'],
    templateUrl: 'presents-table.component.html'
})
export class PresentsTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    public openEdit(item: any): void {
        this.onEdit.emit(item);
    }
}
