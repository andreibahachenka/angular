import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AssociationOfItemDisplayModel, NavItemModel } from './models';
import { RoutesConfig } from '../../../app-config';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnChanges {
    @Input() public navMenuList: NavItemModel[];
    @Input() public hotLinksGroupTitle: string;

    public itemDisplayList: AssociationOfItemDisplayModel[];
    public hotLinksGroup: NavItemModel;
    public navItems: NavItemModel[];

    constructor(
        private router: Router
    ) {
    }

    public ngOnChanges(): void {
        console.log('navmenu', this.navMenuList);
        if (this.navMenuList && this.navMenuList.length) {
            this.itemDisplayList = Array(this.navMenuList.length).fill(0).map((): AssociationOfItemDisplayModel => {
                 return { display: false };
            });
            this.navItems = this.hotLinksGroupTitle
                ? this.navMenuList.filter((item: NavItemModel): boolean => {
                        const result = this.hotLinksGroupTitle === item.title;
                        if (result) {
                            this.hotLinksGroup = item;
                        }
                        return !result;
                })
                : this.navMenuList;
        }
    }

    public routeTo(): void {
        this.router.navigate([RoutesConfig.startAdminRoute]);
    }
}
