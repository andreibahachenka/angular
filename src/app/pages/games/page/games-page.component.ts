import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService } from '../../../services';
import { GamesPageService } from './services/games-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';

@Component({
    selector: 'app-games',
    styleUrls: ['games-page.component.scss'],
    templateUrl: 'games-page.component.html'
})
export class GamesPageComponent implements OnInit {

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];

    public editLotteryMessage: string = 'Edit Lottery';
    public createLotteryMessage: string = 'Create Lottery';
    public deleteMessage: string = 'Are you sure you want to delete this lottery?';
    public upload: string = 'Upload image';

    public name: string = '';
    public status: any;
    public id: string = '';
    public description: string = '';
    public total: number;
    public cost: number;
    public prize: string = '';
    public photo: string = '';

    public objectKeys = Object.keys;

    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;

    @ViewChild("fileInput") fileInput;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public columns: any = [];

    constructor(
        private navMenuService: NavMenuService,
        private gamesPageService: GamesPageService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getLotteries();
    }

    public getLotteries(searchParameters?: any): void {
        this.gamesPageService.getGames(searchParameters)
            .subscribe((res) => {
                this.tableData = res.games;

                this.modifiedTableData = this.tableData;
            });
    }
}
