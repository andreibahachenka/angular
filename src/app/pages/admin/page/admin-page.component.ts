import {
    Component,
    OnInit
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { NavItemModel } from './../../../components/nav-menu/models/nav-menu.model'

@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];

    constructor(
        private navMenuService: NavMenuService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
    }
}
