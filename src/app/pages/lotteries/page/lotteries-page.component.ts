import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { NavMenuService } from '../../../services/nav-menu.service';
import { LotteriesPageService } from './services/lotteries-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-lotteries',
    styleUrls: ['lotteries-page.component.scss'],
    templateUrl: 'lotteries-page.component.html'
})
export class LotteriesPageComponent {
    // public tableData: any[] = [];
    // public modifiedTableData: any[] = [];
    // public navItems: NavItemModel[];
    //
    // public editAdministratorMessage: string = 'Edit Administrator';
    // public createAdministratorMessage: string = 'Create Administrator';
    // public deleteMessage: string = 'Are you sure you want to delete this administrator?';
    //
    // public name: string = '';
    // public userName: string = '';
    // public status: any;
    // public id: string = '';
    //
    // public objectKeys = Object.keys;
    //
    // @ViewChild('deleteModal') public deleteModal: ElementRef;
    // @ViewChild('createModal') public createModal: ElementRef;
    // @ViewChild('editModal') public editModal: ElementRef;
    //
    // public statuses = {
    //     1: 'Active',
    //     0: 'Not Active',
    //     2: 'Waiting moderation'
    // };
    //
    // public columns: any = [
    //     { name : 'Username'},
    //     { name : 'Name'},
    //     { name : 'Status'}
    // ];
    //
    // public inputEditForm: FormGroup = new FormGroup({
    //     name: new FormControl(this.name, Validators.required),
    //     username: new FormControl(this.userName, Validators.required),
    //     status: new FormControl(this.status, Validators.required),
    //     id: new FormControl(this.id),
    //     password: new FormControl('', Validators.required),
    //     confirmpassword: new FormControl('', Validators.required)
    // }, this.pwdMatchValidator);
    //
    // public inputCreateForm: FormGroup = new FormGroup({
    //     name: new FormControl('', Validators.required),
    //     username: new FormControl('', Validators.required),
    //     status: new FormControl('', Validators.required),
    //     password: new FormControl('', Validators.required),
    //     confirmpassword: new FormControl('', Validators.required)
    // }, this.pwdMatchValidator);
    //
    // constructor(
    //     private navMenuService: NavMenuService,
    //     private modalWindowService: ModalWindowService,
    //     private lotteriesPageService: LotteriesPageService
    // ) {
    // }
    //
    // public ngOnInit() {
    //     this.navMenuService.getMainNavMenu()
    //         .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);
    //
    //     this.getAdministrators();
    // }
    //
    // public pwdMatchValidator(frm: FormGroup) {
    //     return frm.get('password').value === frm.get('confirmpassword').value
    //         ? null : {'mismatch': true};
    // }
    //
    //
    // public getAdministrators(searchParameters?: any): void {
    //     this.lotteriesPageService.getAdministrator(searchParameters)
    //         .subscribe((res) => {
    //             this.tableData = res.admins;
    //
    //             this.modifiedTableData = this.tableData;
    //             this.modifiedTableData.map((obj) => {
    //                 if (obj.status === 1) {
    //                     obj.status = 'Active';
    //                 } else if (obj.status === 2) {
    //                     obj.status = 'Waiting moderation';
    //                 } else if (obj.status === 0) {
    //                     obj.status = 'Not Active';
    //                 }
    //             });
    //         });
    // }
    //
    // public createAdmin(): void {
    //     this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    // }
    //
    // public openEdit(item: any): void {
    //     this.name = item.name;
    //     this.userName = item.username;
    //     this.status = item.status;
    //     this.id = item.id;
    //
    //     this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    // }
    //
    // public openDelete(item: any): void {
    //     this.id = item.id;
    //     this.modalWindowService.showModalWindow({ outsideClose: true, content: this.deleteModal });
    // }
    //
    // public saveChanges(data): void {
    //     let adminForm = {
    //         id: data.id,
    //         name: data.name,
    //         password: data.password,
    //         username: data.username,
    //         status: data.status
    //     };
    //     console.log(adminForm);
    //     this.lotteriesPageService.updateAdministrator(adminForm)
    //         .subscribe((res) => {
    //                 this.getAdministrators();
    //                 this.modalWindowService.closeModalWindow();
    //             },
    //             (err) => {
    //                 console.error(err);
    //             })
    // }
    //
    // public applyDelete(id): void {
    //     this.lotteriesPageService.deleteAdministrator(id)
    //         .subscribe((res) => {
    //                 this.getAdministrators();
    //                 this.modalWindowService.closeModalWindow();
    //             },
    //             (err) => {
    //                 console.error(err);
    //             })
    // }
    //
    // public sendCreateForm(data): void {
    //     let adminForm = {
    //         name: data.name,
    //         password: data.password,
    //         username: data.username,
    //         status: data.status
    //     };
    //     this.lotteriesPageService.setAdministrator(adminForm)
    //         .subscribe((res) => {
    //                 this.getAdministrators();
    //                 this.modalWindowService.closeModalWindow();
    //             },
    //             (err) => {
    //                 console.error(err);
    //             })
    // }
    //
    // public cancel(): void {
    //     this.inputCreateForm.reset();
    //     this.inputEditForm.reset();
    //     this.modalWindowService.closeModalWindow();
    // }
}
