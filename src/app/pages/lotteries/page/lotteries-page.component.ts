import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { NavMenuService, FileUploadService } from '../../../services';
import { LotteriesPageService } from './services/lotteries-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from './../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-lotteries',
    styleUrls: ['lotteries-page.component.scss'],
    templateUrl: 'lotteries-page.component.html'
})
export class LotteriesPageComponent implements OnInit{

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

    public columns: any = [
        { name : 'Name'},
        { name : 'Total'},
        { name : 'Status'},
        { name : 'Cost'}
    ];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        description: new FormControl(this.description, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        total: new FormControl(this.total, Validators.required),
        cost: new FormControl(this.cost, Validators.required),
        prize: new FormControl(this.prize, Validators.required)
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        cost: new FormControl('', Validators.required),
        prize: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        photo: new FormControl('')
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private lotteriesPageService: LotteriesPageService,
        private fileUploadService: FileUploadService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getLotteries();
    }

    public getLotteries(searchParameters?: any): void {
        this.lotteriesPageService.getLotteries(searchParameters)
            .subscribe((res) => {
            console.log('res', res);
                this.tableData = res.lotteries;

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

    public createLottery(): void {
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        this.name = item.name;
        this.status = item.status;
        this.id = item.id;
        this.description = item.description;
        this.prize = item.product_name;
        this.cost = item.cost;
        this.total = item.total;

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
            cost: data.cost,
            total: data.total,
            status: data.status,
            product_name: data.prize,
            product_photo: this.photo
        };
        console.log('dataCreate',adminForm);
        this.lotteriesPageService.updateLottery(adminForm)
            .subscribe((res) => {
                    this.getLotteries();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public applyDelete(id): void {
        this.lotteriesPageService.deleteLottery(id)
            .subscribe((res) => {
                    this.getLotteries();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public handleFileInput(files: FileList): void {
        let photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            // .switchMap((result) => this.lotteriesPageService.getLotteries())
            .subscribe((result: any) => {
                this.photo = result.url;
                console.log(result.url);
            });
    }

    public sendCreateForm(data): void {
        console.log('sendform photo', data.photo);
        let adminForm = {
            name: data.name,
            cost: data.cost,
            total: data.total,
            status: data.status,
            description: data.description,
            product_name: data.prize,
            product_photo: this.photo
        };
        console.log('adminForm', adminForm);
        this.lotteriesPageService.setLottery(adminForm)
            .subscribe((res) => {
                    this.getLotteries();
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
