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
    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];

    public editAdministratorMessage: string = 'Edit Administrator';
    public createAdministratorMessage: string = 'Create Administrator';
    public deleteMessage: string = 'Are you sure you want to delete this administrator?';

    public name: string = '';
    public userName: string = '';
    public status: any;
    public id: string = '';

    public filterName: string = '';
    public filterUsername: string = '';

    public objectKeys = Object.keys;

    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public columns: any = [
        { name : 'Username'},
        { name : 'Name'},
        { name : 'Status'}
    ];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        username: new FormControl(this.userName, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required)
    }, this.pwdMatchValidator);

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmpassword: new FormControl('', Validators.required)
    }, this.pwdMatchValidator);

    public inputFilterForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        username: new FormControl('')
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private administratorsPageService: AdministratorsPageService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getAdministrators();
    }

    public pwdMatchValidator(frm: FormGroup) {
        return frm.get('password').value === frm.get('confirmpassword').value
            ? null : {'mismatch': true};
    }


    public getAdministrators(searchParameters?: any): void {
        this.administratorsPageService.getAdministrator(searchParameters)
            .subscribe((res) => {
                this.tableData = res.admins;

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

    public filterData(searchParameters): void {
        searchParameters.name = this.inputFilterForm.value.name;
        searchParameters.username = this.inputFilterForm.value.username;

        this.administratorsPageService.getAdministrator(searchParameters)
            .subscribe(() => {
                    this.getAdministrators(searchParameters);
                },
                (err) => {
                    console.error(err);
                })
    }

    public clearForm(): void {
        this.inputFilterForm.reset();
    }

    public createAdmin(): void {
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        this.name = item.name;
        this.userName = item.username;
        this.status = item.status;
        this.id = item.id;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public openDelete(item: any): void {
        this.id = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.deleteModal });
    }

    public saveChanges(data): void {
        let adminForm = {
            id: data.id,
            name: data.name,
            password: data.password,
            username: data.username,
            status: data.status
        };
        this.administratorsPageService.updateAdministrator(adminForm)
            .subscribe((res) => {
                    this.getAdministrators();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public applyDelete(id): void {
        this.administratorsPageService.deleteAdministrator(id)
            .subscribe((res) => {
                    this.getAdministrators();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        let adminForm = {
            name: data.name,
            password: data.password,
            username: data.username,
            status: data.status
        };
        this.administratorsPageService.setAdministrator(adminForm)
            .subscribe((res) => {
                    this.getAdministrators();
                    this.modalWindowService.closeModalWindow();
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
}
