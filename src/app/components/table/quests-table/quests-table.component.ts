import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'quests-table-component',
    styleUrls: ['quests-table.component.scss'],
    templateUrl: 'quests-table.component.html'
})
export class QuestsTableComponent {
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
