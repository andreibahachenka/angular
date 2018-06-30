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
import { FileUploadService } from '../../../services';

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
    public count = 0;
    public offset = 0;

    public timeCorrect: number;
    public defaultDate: any;
    public upload: string = 'Upload photo';
    public userImage: string = null;
    public isUserImageUploaded: boolean = false;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation',
        3: 'Delete request'
    };

    public name: string = '';
    public userName: string = '';
    public index: any;
    public tm: string = '';
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
    public filterStatus: any;

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
        index: new FormControl(this.index),
        tm: new FormControl(this.tm),
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
        userImage: new FormControl(this.userImage),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl(''),
        index: new FormControl(null),
        tm: new FormControl(''),
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
        userImage: new FormControl(null),
    });

    public inputFilterForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        status: new FormControl(this.filterStatus)
    });

    constructor(
        private navMenuService: NavMenuService,
        private usersPageService: UsersPageService,
        private modalWindowService: ModalWindowService,
        private gettingCityService: GettingCityService,
        private utilsService: UtilsService,
        private fileUploadService: FileUploadService,
    ) {
    }

    public ngOnInit() {
        this.defaultDate = new Date();
        this.defaultDate.setHours(12);
        this.defaultDate.setMinutes(0);
        this.defaultDate.setSeconds(0);
        this.timeCorrect = this.defaultDate.getTimezoneOffset() / -60;
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getUsers();
        this.gettingCityService.getCity()
            .subscribe((item)=> this.cities = item);
    }

    public getUsers(searchParameters?: any): void {
        this.offset = (searchParameters && searchParameters.offset) ? searchParameters.offset : 0;
        this.usersPageService.getUser(searchParameters)
            .subscribe((res) => {
            this.tableData = res.users;
            this.count = res.total;

                this.modifiedTableData = this.tableData;
                this.modifiedTableData.map((obj) => {
                    if (obj.status === 1) {
                        obj.status = 'Active';
                    } else if (obj.status === 2) {
                        obj.status = 'Waiting moderation';
                    } else if (obj.status === 0) {
                        obj.status = 'Not Active';
                    } else if (obj.status === 3) {
                        obj.status = 'Delete request';
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
        this.index = item.index;
        this.tm = item.tm;
        this.surName = item.surname;
        this.phone = item.phone;
        this.email = item.email;
        this.status = this.utilsService.getKeyByValue(this.statuses, item.status);
        this.id = item.id;
        this.shop_id = item.shop_id;
        this.city_id = item.city_id;
        this.isUserImageUploaded = !!item.photo;
        this.userImage = item.photo ? item.photo : null;

        this.utilsService.addLog({action: 'view_user_profile', info: `User id = ${item.id}`}).subscribe();

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public openDelete(item: any): void {
        this.id = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.deleteModal });
    }

    public createUser(): void {
        this.inputCreateForm.reset();
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
        this.isUserImageUploaded = false;
        this.userImage = null;
    }

    public saveChanges(data): void {
        data.photo = this.userImage;
        data.index = parseInt(data.index);
        this.usersPageService.updateUser(data)
            .subscribe((res) => {
                    this.utilsService.addLog({action: 'edit_user_profile', info: `User id = ${data.id}`}).subscribe();
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
                    this.utilsService.addLog({action: 'delete_user_profile', info: `User id = ${id}`}).subscribe();
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        data.photo = this.userImage;
        data.index = parseInt(data.index);
        this.usersPageService.setUser(data)
            .subscribe((res) => {
                    this.getUsers();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public filterData(searchParameters, download = false, filter = false): void {
        searchParameters.name = this.inputFilterForm.value.name;
        searchParameters.surname = this.inputFilterForm.value.surname;
        searchParameters.email = this.inputFilterForm.value.email;
        searchParameters.phone = this.inputFilterForm.value.phone;
        searchParameters.status = this.inputFilterForm.value.status;
        searchParameters.time = this.timeCorrect;

        if (filter) {
            this.offset = 0;
            console.log(searchParameters);
        }

        if (!download) {
            this.usersPageService.getUser(searchParameters)
                .subscribe(() => {
                        this.getUsers(searchParameters);
                    },
                    (err) => {
                        console.error(err);
                    })
        } else {
            this.usersPageService.getXLSX(searchParameters)
                .subscribe((res) => {
                    if(res.url) {
                        console.log(res.url);

                        window.location.href = res.url;
                    }

                });
        }
    }

    public handleFileInputForUser(files: FileList, index): void {
        const photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            .subscribe((result: any) => {
                    this.userImage = result.url;
                    this.isUserImageUploaded = true;
                },
                (err) => {
                    console.log(err);
                    this.isUserImageUploaded = false;
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
