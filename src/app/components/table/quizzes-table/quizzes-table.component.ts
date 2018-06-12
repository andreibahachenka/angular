import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'quizzes-table-component',
    styleUrls: ['./quizzes-table.component.scss'],
    templateUrl: './quizzes-table.component.html'
})
export class QuizzesTableComponent {
    @Input() public rows: any[] = [];
    @Input() public columns: any[] = [];
    @Input() public specialQuiz: string;
    @Output() public onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onSendToAll: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(
    ){
    }

    public openEdit(item: any): void {
        this.onEdit.emit(item);
    }

    public openSendToAll(id: any): void {
        this.onSendToAll.emit(id);
    }

    public openDelete(item: any): void {
        this.onDelete.emit(item);
    }

}
