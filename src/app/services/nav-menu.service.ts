import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService } from './rest-api.service';
import { NavItemModel } from 'app/components/nav-menu/models';

@Injectable()
export class NavMenuService {
    constructor(
        private restApiService: RestApiService
    ) {
    }

    public getMainNavMenu(): Observable<NavItemModel[]> {
        return this.restApiService.getItems(`assets/mock-data/nav-menu.mock.json`)
            .map((dataItems: any[]) => {
                const navMenu: NavItemModel[] = dataItems.map((dataItem) => new NavItemModel(
                    dataItem.title,
                    dataItem.url
                ));
                return navMenu;
            });
    }

}
