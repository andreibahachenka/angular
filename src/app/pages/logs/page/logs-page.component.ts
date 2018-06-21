import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { NavMenuService, UtilsService } from '../../../services/';
import { LogsPageService } from './services/logs-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-logs',
    styleUrls: ['logs-page.component.scss'],
    templateUrl: 'logs-page.component.html'
})
export class LogsPageComponent implements OnInit {
    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];

    public status: any;
    public id: string = '';

    public filterId: string = '';

    public objectKeys = Object.keys;

    public columns: any = [];

    // public columns: any = [
    //     { name : 'AdminId'},
    //     { name : 'Action'},
    //     { name : 'Info'},
    //     { name : 'Date'}
    // ];


    public inputFilterForm: FormGroup = new FormGroup({
        id: new FormControl(''),
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private logsPageService: LogsPageService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getLogs();
    }

    public getLogs(searchParameters?: any): void {
        this.logsPageService.getLogs(searchParameters)
            .subscribe((res) => {
                this.tableData = res.logs;

                this.modifiedTableData = this.tableData;
            });
    }

    public filterData(searchParameters): void {
        searchParameters.id = this.inputFilterForm.value.id;

        this.logsPageService.getLogs(searchParameters)
            .subscribe(() => {
                    this.getLogs(searchParameters);
                },
                (err) => {
                    console.error(err);
                })
    }

    public clearForm(): void {
        this.inputFilterForm.reset();
    }

}
