import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
} from '@angular/core';

import {
    NgForm,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { NavMenuService, FileUploadService, UtilsService } from '../../../services';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { PresentsPageService } from "./services/presents-page.service";

@Component({
    selector: 'app-presents',
    styleUrls: ['presents-page.component.scss'],
    templateUrl: 'presents-page.component.html',
})
export class PresentsPageComponent implements OnInit{

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];
    public fileToUpload: File;

    public editPresentMessage: string = 'Edit Present';
    public createPresentMessage: string = 'Create Present';
    public upload: string = 'Upload image';

    public name: string = '';
    public status: any;
    public id: string = '';
    public price: number;
    public count: number;
    public photo: string = '';
    public description: string = '';
    public isImageUploaded: boolean = false;

    public objectKeys = Object.keys;

    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public columns: any = [
        { name : 'Price'},
        { name : 'Status'},
        { name : 'Count'}
    ];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        price: new FormControl(this.price, Validators.required),
        count: new FormControl(this.count, Validators.required),
        photo: new FormControl(this.photo),
        description: new FormControl(this.description, Validators.required),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        count: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        photo: new FormControl(''),
        description: new FormControl(''),
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private presentsPageService: PresentsPageService,
        private fileUploadService: FileUploadService,
        private utilsService: UtilsService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getPresents();
    }

    public getPresents(searchParameters?: any): void {
        this.presentsPageService.getPresents(searchParameters)
            .subscribe((res) => {
                this.tableData = res.products;

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

    public createPresent(): void {
        this.inputCreateForm.reset();
        this.isImageUploaded = false;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        this.isImageUploaded = true;
        this.name = item.name;
        this.status = this.utilsService.getKeyByValue(this.statuses, item.status);
        this.id = item.id;
        this.count = item.count;
        this.price = item.price;
        this.photo = item.photo;
        this.description = item.description;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public saveChanges(data): void {
        let presentForm = {
            id: data.id,
            name: data.name,
            count: data.count,
            price: data.price,
            status: data.status,
            photo: this.photo,
            description: data.description
        };
        this.presentsPageService.updatePresent(presentForm)
            .subscribe((res) => {
                    this.getPresents();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public handleFileInput(files: FileList): void {
        let photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            .subscribe((result: any) => {
                    this.photo = result.url;
                    this.isImageUploaded = true;
                },
                (err) => {
                    console.log(err);
                    this.isImageUploaded = false;
                })
    }

    public sendCreateForm(data): void {
        let presentForm = {
            name: data.name,
            count: data.count,
            price: data.price,
            status: data.status,
            photo: this.photo,
            description: data.description
        };
        this.presentsPageService.setPresent(presentForm)
            .subscribe((res) => {
                    this.getPresents();
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
