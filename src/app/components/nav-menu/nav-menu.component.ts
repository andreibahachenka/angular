import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AssociationOfItemDisplayModel, NavItemModel } from './models';
import { RoutesConfig } from '../../../app-config';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnChanges {
    @Input() public navMenuList: NavItemModel[];
    @Input() public hotLinksGroupTitle: string;
    @Output() public onSideNavToogle: EventEmitter<null> = new EventEmitter<null>();

    public itemDisplayList: AssociationOfItemDisplayModel[];
    public hotLinksGroup: NavItemModel;
    public navItems: NavItemModel[];

    constructor(
        private router: Router,
        private utilsService: UtilsService
    ) {
    }

    public ngOnChanges(): void {
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

    public routeTo(url, title): void {
        this.utilsService.addLog({action: 'open_section', info: title}).subscribe();
        this.router.navigate([RoutesConfig.adminUrl + url]);
        this.hideNavMenu();
    }

    public hideNavMenu(): void {
        this.onSideNavToogle.emit();
    }
}
