import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'games-table-component',
    styleUrls: ['./games-table.component.scss'],
    templateUrl: './games-table.component.html'
})
export class GamesTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];

    constructor(
    ){
    }
}
