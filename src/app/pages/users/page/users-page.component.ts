import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NavMenuService, GettingCityService, UtilsService } from '../../../services/';
import { UsersPageService } from './services/users-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-users',
    styleUrls: ['users-page.component.scss'],
    templateUrl: 'users-page.component.html'
})
export class UsersPageComponent implements OnInit {
    public navItems: NavItemModel[];
    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public editUserMessage: string = 'Edit User';
    public createUserMessage: string = 'Create User';
    public deleteMessage: string = 'Are you sure you want to delete this user?';

    public phoneValidationExp = /^[0-9-+()]*$/;
    public emailValidationExp =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public objectKeys = Object.keys;

    public cities = [];

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation',
        3: 'Waiting for deletion'
    };

    public name: string = '';
    public userName: string = '';
    public surName: string = '';
    public phone: string = '';
    public email: string = '';
    public status: any;
    public id: string = '';
    public shop_id: string;
    public city_id: string;

    public filterName: string = '';
    public filterSurname: string = '';
    public filterEmail: string = '';
    public filterPhone: string = '';

    @ViewChild('editModal') public editModal: ElementRef;
    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;

    public columns: any = [
        { name : 'Name'},
        { name : 'Username'},
        { name : 'Surname'},
        { name : 'Status'},
        { name : 'Points'}
    ];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        username: new FormControl(this.userName),
        surname: new FormControl(this.surName, Validators.required),
        email: new FormControl(this.email, [
            Validators.required,
            Validators.pattern(this.emailValidationExp)
        ]),
        phone: new FormControl(this.phone, [
            Validators.required,
            Validators.pattern(this.phoneValidationExp)
        ]),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        shop_id: new FormControl(this.shop_id, [
            Validators.required
        ]),
        city_id: new FormControl(this.city_id, [
            Validators.required,
            Validators.pattern(this.phoneValidationExp)
        ]),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl(''),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(this.emailValidationExp)
        ]),
        phone: new FormControl('', [
            Validators.required,
            Validators.pattern(this.phoneValidationExp)
        ]),
        shop_id: new FormControl('', [
            Validators.required
        ]),
        city_id: new FormControl('', [
            Validators.required,
            Validators.pattern(this.phoneValidationExp)
        ]),
        status: new FormControl('', Validators.required),
    });

    public inputFilterForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl('')
    });

    constructor(
        private navMenuService: NavMenuService,
        private usersPageService: UsersPageService,
        private modalWindowService: ModalWindowService,
        private gettingCityService: GettingCityService,
        private utilsService: UtilsService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
        this.gettingCityService.getCity()
            .subscribe((item)=> this.cities = item);
    }

    public getUsers(searchParameters?: any): void {
        this.usersPageService.getUser(searchParameters)
            .subscribe((res) => {
            this.tableData = res.users;

                this.modifiedTableData = this.tableData;
                this.modifiedTableData.map((obj) => {
                    if (obj.status === 1) {
                        obj.status = 'Active';
                    } else if (obj.status === 2) {
                        obj.status = 'Waiting moderation';
                    } else if (obj.status === 0) {
                        obj.status = 'Not Active';
                    } else if (obj.status === 3) {
                        obj.status = 'Waiting for deletion';
                }

                    if (obj.is_bot === 1) {
                        obj.name = `${obj.name} (Bot)`;
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
        this.status = this.utilsService.getKeyByValue(this.statuses, item.status);
        this.id = item.id;
        this.shop_id = item.shop_id;
        this.city_id = item.city_id;

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
        this.usersPageService.updateUser(data)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public applyDelete(id): void {
        this.usersPageService.deleteUser(id)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        this.usersPageService.setUser(data)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public filterData(searchParameters): void {
        searchParameters.name = this.inputFilterForm.value.name;
        searchParameters.surname = this.inputFilterForm.value.surname;
        searchParameters.email = this.inputFilterForm.value.email;
        searchParameters.phone = this.inputFilterForm.value.phone;

        this.usersPageService.getUser(searchParameters)
            .subscribe(() => {
                this.getUsers(searchParameters);
            },
            (err) => {
                console.error(err);
            })
    }

    public cancel(): void {
        this.inputCreateForm.reset();
        this.inputEditForm.reset();
        this.modalWindowService.closeModalWindow();
    }

    public clearForm(): void {
        this.inputFilterForm.reset();
    }
}
