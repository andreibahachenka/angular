import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { NavMenuService } from '../../../services/nav-menu.service';
import { AdminPageService } from './services/admin-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-admin',
    styleUrls: ['admin-page.component.scss'],
    templateUrl: 'admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
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
        username: new FormControl(this.userName, Validators.required),
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
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(this.emailValidationExp)
        ]),
        phone: new FormControl('', [
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
        private adminPageService: AdminPageService,
        private modalWindowService: ModalWindowService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
    }

    public getUsers(searchParameters?: any): void {
        this.adminPageService.getUser(searchParameters)
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

    public filterData(searchParameters): void {
        searchParameters.name = this.inputFilterForm.value.name;
        searchParameters.surname = this.inputFilterForm.value.surname;
        searchParameters.email = this.inputFilterForm.value.email;
        searchParameters.phone = this.inputFilterForm.value.phone;

        this.adminPageService.getUser(searchParameters)
            .subscribe(() => {
            this.getUsers(searchParameters);
                // this.getUsers();
            },
            (err) => {
                console.error(err);
            })
    }

    public cancel(): void {
        this.inputCreateForm.reset();
        this.modalWindowService.closeModalWindow();
    }

    public clearForm(): void {
        this.inputFilterForm.reset();
    }
}
