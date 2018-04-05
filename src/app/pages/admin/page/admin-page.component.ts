import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdminPageService } from './services/admin-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';


@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit{
    public navItems: NavItemModel[];
    public tableData: any[] = [];

    public edit: string = 'Edit User';

    public name: string = '';
    public userName: string = '';
    public surName: string = '';
    public phone: string = '';
    public email: string = '';
    public status: string = '';
    public points: string = '';
    public cityId: string = '';
    public shopId: string = '';

    @ViewChild('report') public report: ElementRef;
    @ViewChild('delete') public delete: ElementRef;

    public columns: any = [
        { name : 'Id'},
        { name : 'Name'},
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'Photo'},
        { name : 'Phone'},
        { name : 'Email'},
        { name : 'Status'},
        { name : 'Points'},
        { name : 'Shop_id'},
        { name : 'City_id'},
    ];

    constructor(
        private navMenuService: NavMenuService,
        private adminPageService: AdminPageService,
        private modalWindowService: ModalWindowService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
    }

    public getUsers(): void {
        this.adminPageService.getUser()
            .subscribe((res) => {
            this.tableData = res.users;

            //converters
            this.tableData = this.tableData.map((obj) => {
                obj['shopId'] = obj['shop_id'];
                delete obj['shop_id'];
                return obj;
            });

            this.tableData = this.tableData.map((obj) => {
                obj['cityId'] = obj['city_id'];
                delete obj['city_id'];
                return obj;
            });
            this.tableData.map((obj) => {
                if (obj.status === 1) {
                    obj.status = 'Active';
                } else if (obj.status === 2) {
                    obj.status = 'Waiting moderation';
                }
            });
        });
    }

    public openEdit(item: any): void {
        this.name = item.name;
        this.userName = item.username;
        this.surName = item.surname;
        this.phone = item.phone;
        this.email = item.email;
        this.cityId = item.cityId;
        this.shopId = item.shopId;
        this.status = item.status;
        this.points = item.points;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.report });
    }

    public openDelete(item: any): void {
        this.modalWindowService.showModalWindow({outsideClose: true, content: this.delete });
    }
}
