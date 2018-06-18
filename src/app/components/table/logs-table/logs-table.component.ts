import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'logs-table-component',
    styleUrls: ['./logs-table.component.scss'],
    templateUrl: './logs-table.component.html'
})
export class LogsTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];

    constructor(
    ){
    }

}
