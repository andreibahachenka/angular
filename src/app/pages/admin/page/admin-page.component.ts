import {
    Component,
    OnInit
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdminPageService } from './services/admin-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';


@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];
    public tableData: any[] = [];

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
        { name : 'City_id'}
    ];

    constructor(
        private navMenuService: NavMenuService,
        private adminPageService: AdminPageService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
    }

    public getUsers() {
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
        });
    }
}
