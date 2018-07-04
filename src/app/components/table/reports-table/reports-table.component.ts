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
    @Input() public count: any = 0;
    @Input() public offset: any = 0;
    @Input() public paging: boolean = false;
    @Input() public lotteries: string;
    @Input() public quests: string;
    @Input() public specialquizzes: string;
    @Input() public orders: string;
    @Input() public ratings: string;
    @Input() public users: string;
    @Output() public page: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    public getReports(item: any): void {
        this.page.emit(item);
    }
}
