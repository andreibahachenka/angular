import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdminPageService } from './services/admin-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';


@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];
    public tableData: any[] = [];

    public itemId: string = '';
    @ViewChild('report') public report: ElementRef;

    public columns: any = [
        { name : 'Id'},
        { name : 'Name'},
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'Photo'},
        { name : 'Phone'},
        { name : 'Email'},
        { name : 'Status'},
        { name : 'Points'},
        { name : 'Shop_id'},
        { name : 'City_id'},
    ];

    constructor(
        private navMenuService: NavMenuService,
        private adminPageService: AdminPageService,
        private modalWindowService: ModalWindowService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
    }

    public getUsers(): void {
        this.adminPageService.getUser()
            .subscribe((res) => {
            this.tableData = res.users;

            //converters
            this.tableData = this.tableData.map((obj) => {
                obj['shopId'] = obj['shop_id'];
                delete obj['shop_id'];
                return obj;
            });

            this.tableData = this.tableData.map((obj) => {
                obj['cityId'] = obj['city_id'];
                delete obj['city_id'];
                return obj;
            });
            this.tableData.map((obj) => {
                if (obj.status === 1) {
                    obj.status = 'Active';
                } else if (obj.status === 2) {
                    obj.status = 'Waiting moderation';
                }
            });
        });
    }

    public openReport(item: any): void {
        this.itemId = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.report });
    }
}
