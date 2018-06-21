import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService } from '../../../services';
import { ReportsPageService } from './services/reports-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { MatTabChangeEvent } from "@angular/material";
import { QuizzesPageService } from './../../quizzes/page/services/quizzes-page.service';

@Component({
    selector: 'app-reports',
    styleUrls: ['reports-page.component.scss'],
    templateUrl: 'reports-page.component.html'
})
export class ReportsPageComponent implements OnInit {
    constructor(
        private reportsPageService: ReportsPageService,
        private navMenuService: NavMenuService,
        private quizzesPageService: QuizzesPageService
    ){}

    public navItems: NavItemModel[];
    public specialQuizTableData = [];
    public gamesTableData = [];
    public lotteriesTableData = [];
    public quizzes: any[] = [];

    public quiz_id: string;
    public games: string = 'games';
    public lotteries: string = 'lotteries';
    public specialquizzes: string = 'specialquizzes';

    public columns: any = [
    ];


    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.reportsPageService.getSpecialQuizzesForReport()
            .subscribe((res) => {
                this.specialQuizTableData = res.rows;
            });
        this.quizzesPageService.getQuizzes()
            .subscribe((res) => {
                this.quizzes = res.quizzes;
                let objectForAll = { name: 'All', id: 0 };
                this.quizzes.push(objectForAll);
            });
    }

    public getReports(event: any, data?: any) {
        switch(event.index) {
            case 0 : this.reportsPageService.getSpecialQuizzesForReport(data)
                .subscribe((res) => {
                    this.specialQuizTableData = res.rows;
                });
                break;
            case 1 : this.reportsPageService.getGamesForReport(data)
                .subscribe((res) => {
                    this.gamesTableData = res.rows;
                });
                break;
            case 2 : this.reportsPageService.getLotteriesForReport(data)
                .subscribe((res) => {
                    this.lotteriesTableData = res.rows;
                });
                break;
        }
    }

    public filterData(from, to) {
        let quiz_id= this.quiz_id || '';
        let startDate = new Date(from);
        let finishDate = new Date(to);
        let start_date = '';
        let end_date = '';
        if (from != null) {
            start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (to != null) {
            end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }
        let params = {
            start_date,
            end_date,
            quiz_id
        };
        this.reportsPageService.getSpecialQuizzesForReport(params)
            .subscribe((res) => {
                this.specialQuizTableData = res.rows;
            })
    }
}