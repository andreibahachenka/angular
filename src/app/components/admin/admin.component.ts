import { Component, OnInit } from '@angular/core';


import { NavMenuService } from '../../services/nav-menu.service';
import { NavItemModel } from '../nav-menu/models/nav-menu.model';

@Component({
    selector: 'app-admin',
    styleUrls: ['./admin.component.scss'],
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    public navItems: NavItemModel[];

    constructor(private navMenuService: NavMenuService) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
    }
}
