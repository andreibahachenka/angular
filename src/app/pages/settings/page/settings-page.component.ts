import {
    Component,
    OnInit
} from '@angular/core';

import {
    NgForm,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { NavMenuService, UtilsService, NotificationService } from '../../../services';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { SettingsPageService } from './services/settings-page.service';

@Component({
    selector: 'app-settings',
    styleUrls: ['settings-page.component.scss'],
    templateUrl: 'settings-page.component.html',
})
export class SettingsPageComponent implements OnInit {

    public navItems: NavItemModel[];

    public topics = {
        0: 'Random',
        1: 'Winston',
        2: 'Camel',
        3: 'LD'
    };

    public objectKeys = Object.keys;

    public topic: number;
    public winCoins: string = '';
    public loseCoins: string = '';
    public specialCoins: string = '';
    public drawCoins: string = '';

    public inputSettingForm: FormGroup = new FormGroup({
        topic: new FormControl(this.topic),
        winCoins: new FormControl(this.winCoins),
        loseCoins: new FormControl(this.loseCoins),
        specialCoins: new FormControl(this.specialCoins),
        drawCoins: new FormControl(this.drawCoins)
    });

    constructor(
        private navMenuService: NavMenuService,
        private notificationService: NotificationService,
        private settingsPageService: SettingsPageService,
        private utilsService: UtilsService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getSettings();
    }

    public getSettings(searchParameters?: any): void {
        this.settingsPageService.getSettings(searchParameters)
            .subscribe((res) => {
                this.topic = res.default_theme;
                this.winCoins = res.win_coins;
                this.loseCoins = res.lose_coins;
                this.drawCoins = res.draw_coins;
                this.specialCoins = res.special_coins;
            });
    }

    public saveSettings(data): void {
        let dataToUpdate = {
            default_theme: data.topic,
            win_coins: data.winCoins,
            lose_coins: data.loseCoins,
            draw_coins: data.drawCoins,
            special_coins: data.specialCoins
        };
        this.settingsPageService.updateSettings(dataToUpdate)
            .subscribe((res) => {
                let dataSuccess = 'Data was changed succesfully';
                this.getSettings();
                this.notificationService.ok(dataSuccess)
            },
                (err) => {
                    console.error(err);
                })
    }
}
