import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output() public onSideNavToogle: EventEmitter<null> = new EventEmitter<null>();

    // public appToolBarLogo: string = PathConfig.mainLogoPath;

    constructor(
    ){
    }
}
