import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageConfig } from '../../../app-config/locastorage.config';
import { RoutesConfig } from '../../../app-config/routes.config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output() public onSideNavToogle: EventEmitter<null> = new EventEmitter<null>();

    public admin: string = 'Admin';
    public logoutName: string = 'Logout';

    constructor(
        private router: Router
    ){
    }

    public logout(): void {
        localStorage.removeItem(LocalStorageConfig.token);
        this.router.navigate([RoutesConfig.login]);
    }
}
