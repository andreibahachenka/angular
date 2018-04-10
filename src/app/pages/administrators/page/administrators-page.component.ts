import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdministratorsPageService } from './services/administrators-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-administrators',
    styleUrls: ['administrators-page.component.scss'],
    templateUrl: 'administrators-page.component.html'
})
export class AdministratorsPageComponent implements OnInit {

    public navItems: NavItemModel[];

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
    }
}
