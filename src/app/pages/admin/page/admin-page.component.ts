import {
    Component,
    OnInit
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { NavItemModel } from './../../../components/nav-menu/models/nav-menu.model'
import { RestApiService } from '../../../services/rest-api.service';

@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];
    public tableData: any[] = [];

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
            'http://46.30.42.15:8066/v1/admin/users?limit=&offset=&id=&email=&phone=&username=',
            (err) => {
                console.error(err);
            }
        ).first()
            .subscribe((res) => {
                console.log(res);
                this.tableData = res;
            });
    }
}
