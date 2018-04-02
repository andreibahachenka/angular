import { Component, Output, EventEmitter } from '@angular/core';

import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { RoutesConfig } from '../../../app-config/routes.config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output() public onSideNavToogle: EventEmitter<null> = new EventEmitter<null>();

    public admin: string = 'Admin';
    public logoutName: string = 'Logout';

    // public appToolBarLogo: string = PathConfig.mainLogoPath;

    constructor(
        private router: Router
    ){
    }

    public logout() {
        localStorage.removeItem(LocalStorageConfig.token);
        this.router.navigate([RoutesConfig.login]);
    }
}
