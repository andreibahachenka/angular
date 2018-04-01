import {
    Component,
    OnInit
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { NavItemModel } from './../../../components/nav-menu/models/nav-menu.model'
import { RestApiService } from '../../../services/rest-api.service';

import { PathConfig } from './../../../../app-config/path.config'

@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];
    public tableData: any[] = [];

    public columns: any = [
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'status'},
        { name : 'shop_id'},
        { name : 'points'},
        { name : 'photo'},
        { name : 'phone'},
        { name : 'name'},
        { name : 'id'},
        { name : 'email'},
        { name : 'city_id'}
    ];

    constructor(
        private navMenuService: NavMenuService,
        private restApiService: RestApiService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
        this.getUsers();
    }

    public getUsers() {
        this.restApiService.getItems(
            `${PathConfig.mainPath}/users?limit=&offset=&id=&email=&phone=&username=`,
            (err) => {
                console.error(err);
            }
        ).first()
            .subscribe((res) => {
                this.tableData = res.users;

                //converters
                this.tableData = this.tableData.map(function (obj) {
                    obj['shopId'] = obj['shop_id'];
                    delete obj['shop_id'];
                    return obj;
                });

                this.tableData = this.tableData.map(function (obj) {
                    obj['cityId'] = obj['city_id'];
                    delete obj['city_id'];
                    return obj;
                });
            });
    }
}
