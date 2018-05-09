import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {
    NgForm,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { NavMenuService, FileUploadService } from '../../../services';
import { GamesPageService } from './services/games-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-games',
    styleUrls: ['games-page.component.scss'],
    templateUrl: 'games-page.component.html'
})
export class GamesPageComponent implements OnInit {

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];
    public fileToUpload: File;

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
        private fileUploadService: FileUploadService
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
            console.log('response', res);
            console.log('date', res.games);
            // console.log(new Date(parseInt(res.games.created_at.substr(6))));
                this.tableData = res.games;

                this.modifiedTableData = this.tableData;
                // this.modifiedTableData.map((obj) => {
                //     if (obj.status === 1) {
                //         obj.status = 'Active';
                //     } else if (obj.status === 2) {
                //         obj.status = 'Waiting moderation';
                //     } else if (obj.status === 0) {
                //         obj.status = 'Not Active';
                //     }
                // });
            });
    }

    public handleFileInput(files: FileList): void {
        let photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            .subscribe((result: any) => {
                this.photo = result.url;
            });
    }
}
