import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'table-component',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Output() public onOpenReport: EventEmitter<any> = new EventEmitter<any>();

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

    public openReport(item: any): void {
        this.onOpenReport.emit(item);
    }
}
