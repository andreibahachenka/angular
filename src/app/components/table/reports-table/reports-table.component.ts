import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'reports-table-component',
    styleUrls: ['reports-table.component.scss'],
    templateUrl: 'reports-table.component.html'
})
export class ReportsTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Input() public games: string;
    @Input() public lotteries: string;
    @Input() public specialquizzes: string;

    constructor(
    ){
    }
}
