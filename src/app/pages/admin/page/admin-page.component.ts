import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdminPageService } from './services/admin-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';


// enum StatusMode {
//     0 = 'Not Active',
//     1 = 'Active',
//     2 = 'Waiting moderation'
// }

@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
    public navItems: NavItemModel[];
    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public edit: string = 'Edit User';
    public deleteMessage: string = 'Are you sure you want to delete this user?';

    public objectKeys = Object.keys;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public name: string = '';
    public userName: string = '';
    public surName: string = '';
    public phone: string = '';
    public email: string = '';
    public status: any;
    public id: string = '';

    @ViewChild('editModal') public editModal: ElementRef;
    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;

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

    public inputForm: FormGroup = new FormGroup({
        name: new FormControl(this.name),
        username: new FormControl(this.userName),
        surname: new FormControl(this.surName),
        email: new FormControl(this.email),
        phone: new FormControl(this.phone),
        status: new FormControl(this.status),
        id: new FormControl(this.id),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl(),
        username: new FormControl(),
        surname: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        status: new FormControl(),
        // idCreate: new FormControl(),
    });

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
            // this.tableData = this.tableData.map((obj) => {
            //     obj['shopId'] = obj['shop_id'];
            //     delete obj['shop_id'];
            //     return obj;
            // });
            //
            // this.tableData = this.tableData.map((obj) => {
            //     obj['cityId'] = obj['city_id'];
            //     delete obj['city_id'];
            //     return obj;
            // });

                this.modifiedTableData = this.tableData;
                this.modifiedTableData.map((obj) => {
                    if (obj.status === 1) {
                        obj.status = 'Active';
                    } else if (obj.status === 2) {
                        obj.status = 'Waiting moderation';
                    } else if (obj.status === 0) {
                        obj.status = 'Not Active';
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
        this.status = item.status;
        this.id = item.id;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public openDelete(item: any): void {
        this.id = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.deleteModal });
    }

    public createUser(): void {
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public saveChanges(data: NgForm): void {
        console.log(data);
        this.adminPageService.updateUser(data)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public applyDelete(id): void {
        this.adminPageService.deleteUser(id)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        this.adminPageService.setUser(data)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public cancel(): void {
        this.inputCreateForm.reset();
        this.modalWindowService.closeModalWindow();
    }
}
