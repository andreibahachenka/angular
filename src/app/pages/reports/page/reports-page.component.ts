import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService, FileUploadService, UtilsService } from '../../../services';
import { ReportsPageService } from './services/reports-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { MatTabChangeEvent } from "@angular/material";

@Component({
    selector: 'app-reports',
    styleUrls: ['reports-page.component.scss'],
    templateUrl: 'reports-page.component.html'
})
export class ReportsPageComponent implements OnInit {
    constructor(
        private reportsPageService: ReportsPageService,
        private navMenuService: NavMenuService,
    ){}

    public navItems: NavItemModel[];
    public specialQuizTableData = [];
    public gamesTableData = [];
    public lotteriesTableData = [];

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
    }

    public getReports(event: MatTabChangeEvent) {
        switch(event.index) {
            case 0 : this.reportsPageService.getSpecialQuizzesForReport()
                .subscribe((res) => {
                    this.specialQuizTableData = res.rows;
                });
                break;
            case 1 : this.reportsPageService.getGamesForReport()
                .subscribe((res) => {
                    this.gamesTableData = res.rows;
                });
                break;
            case 2 : this.reportsPageService.getLotteriesForReport()
                .subscribe((res) => {
                    this.lotteriesTableData = res.rows;
                });
                break;
        }
    }

    public filterData(from, to) {
        let startDate = new Date(from);
        let finishDate = new Date(to);
        let parsingStartDate = startDate.getFullYear() + '-' + Number(startDate.getMonth()+1) + '-' + startDate.getDate();
        let parsingFinishDate = finishDate.getFullYear() + '-' + Number(finishDate.getMonth()+1) + '-' + finishDate.getDate();
        let data = {
            parsingStartDate,
            parsingFinishDate
        };
        this.reportsPageService.getSpecialQuizzesForReport(data)
            .subscribe((res) => {
                console.log('res', res);
            })
    }
}