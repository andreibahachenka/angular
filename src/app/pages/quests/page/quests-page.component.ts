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
import { QuestsPageService } from './services/quests-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-quests',
    styleUrls: ['quests-page.component.scss'],
    templateUrl: 'quests-page.component.html',
})
export class QuestsPageComponent implements OnInit{

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];
    public fileToUpload: File;

    public editLotteryMessage: string = 'Edit Quests';
    public createQuestMessage: string = 'Create Quest';
    public upload: string = 'Upload image';

    public name: string = '';
    public status: any;
    public id: string = '';
    public startDate: string = '';
    public finishDate: string = '';
    public description: string = '';
    public quiz_count: string = '';
    public quiz_t1_count: string = '';
    public quiz_t2_count: string = '';
    public quiz_t3_count: string = '';
    public win_quiz_count: string = '';
    public points_count: string = '';
    public products_count: string = '';
    public prize: string = '';
    public photo: string = '';
    public isImageUploaded: boolean = false;

    public objectKeys = Object.keys;

    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;

    @ViewChild("fileInput") fileInput;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        description: new FormControl(this.description, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        prize: new FormControl(this.prize, Validators.required),
        photo: new FormControl(this.photo),
        startDate: new FormControl(this.startDate),
        finishDate: new FormControl(this.finishDate),
        quiz_count: new FormControl(this.quiz_count),
        quiz_t1_count: new FormControl(this.quiz_t1_count),
        quiz_t2_count: new FormControl(this.quiz_t2_count),
        quiz_t3_count: new FormControl(this.quiz_t3_count),
        win_quiz_count: new FormControl(this.win_quiz_count),
        points_count: new FormControl(this.points_count),
        products_count: new FormControl(this.products_count),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        prize: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        photo: new FormControl(''),
        startDate: new FormControl(''),
        finishDate: new FormControl(''),
        quiz_count: new FormControl(''),
        quiz_t1_count: new FormControl(''),
        quiz_t2_count: new FormControl(''),
        quiz_t3_count: new FormControl(''),
        win_quiz_count: new FormControl(''),
        points_count: new FormControl(''),
        products_count: new FormControl(''),
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private questsPageService: QuestsPageService,
        private fileUploadService: FileUploadService,
        private utilsService: UtilsService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getQuests();
    }

    public getQuests(searchParameters?: any): void {
        this.questsPageService.getQuests(searchParameters)
            .subscribe((res) => {
                this.tableData = res.quests;

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
        this.inputCreateForm.reset();
        this.isImageUploaded = false;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        this.isImageUploaded = true;
        this.name = item.name;
        this.status = this.utilsService.getKeyByValue(this.statuses, item.status);
        this.id = item.id;
        this.description = item.description;
        this.prize = item.product_name;
        this.photo = item.product_photo;
        this.startDate = item.start_date;
        this.finishDate = item.end_date;
        this.quiz_count = item.quiz_count;
        this.quiz_t1_count = item.quiz_t1_count;
        this.quiz_t2_count = item.quiz_t2_count;
        this.quiz_t3_count = item.quiz_t3_count;
        this.win_quiz_count = item.win_quiz_count;
        this.points_count = item.points_count;
        this.products_count = item.products_count;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public saveChanges(data): void {
        let questForm = {
            id: data.id,
            name: data.name,
            status: data.status,
            description: data.description,
            product_name: data.prize,
            product_photo: this.photo,
            start_date: data.startDate,
            end_date: data.finishDate,
            quiz_count: data.quiz_count,
            quiz_t1_count: data.quiz_t1_count,
            quiz_t2_count: data.quiz_t2_count,
            quiz_t3_count: data.quiz_t3_count,
            win_quiz_count: data.win_quiz_count,
            points_count: data.points_count,
            products_count: data.products_count,
        };
        this.questsPageService.updateQuest(questForm)
            .subscribe((res) => {
                    this.getQuests();
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
        let questForm = {
            name: data.name,
            status: data.status,
            description: data.description,
            product_name: data.prize,
            product_photo: this.photo,
            start_date: data.startDate,
            end_date: data.finishDate,
            quiz_count: data.quiz_count,
            quiz_t1_count: data.quiz_t1_count,
            quiz_t2_count: data.quiz_t2_count,
            quiz_t3_count: data.quiz_t3_count,
            win_quiz_count: data.win_quiz_count,
            points_count: data.points_count,
            products_count: data.products_count,
        };
        this.questsPageService.setQuest(questForm)
            .subscribe((res) => {
                    this.getQuests();
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
