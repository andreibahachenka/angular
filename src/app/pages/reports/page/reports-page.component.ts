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

    public columns: any = [
        { name : 'Name'},
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'Status'},
        { name : 'Points'}
    ];


    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
    }

    public getSpecialQuizzesReport(event: MatTabChangeEvent) {
        switch(event.index) {
            case 0 : this.reportsPageService.getSpecialQuizzesForReport()
                .subscribe((res) => {
                    console.log('res=================================', res);
                    // this.tableData = res.admins;
                    //
                    // this.modifiedTableData = this.tableData;
                });
                break;
            case 1 : this.reportsPageService.getGamesForReport()
                .subscribe((res) => {
                    console.log('res=================================', res);
                    // this.tableData = res.admins;
                    //
                    // this.modifiedTableData = this.tableData;
                });
                break;
            case 2 : this.reportsPageService.getLotteriesForReport()
                .subscribe((res) => {
                    console.log('res=================================', res);
                    // this.tableData = res.admins;
                    //
                    // this.modifiedTableData = this.tableData;
                });
                break;
        }
        console.log(event);
    }
}