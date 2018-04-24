import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {
    NgForm,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

import { NavMenuService } from '../../../services';
import { QuizzesPageService } from './services/quizzes-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-quizzes',
    styleUrls: ['quizzes-page.component.scss'],
    templateUrl: 'quizzes-page.component.html'
})
export class QuizzesPageComponent implements OnInit{

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];

    public editQuizMessage: string = 'Edit Quiz';
    public createQuizMessage: string = 'Create Quiz';

    public name: string = '';
    public status: any;
    public id: string = '';
    public topic: string = '';

    public objectKeys = Object.keys;

    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public topics = {
        1: 'Winston',
        2: 'Camel',
        3: 'LD'
    };

//     public topics = [
//     {
//         id: 1,
//         name: 'Winston'
//     },
//     {
//         id: 2,
//         name: 'Camel'
//     },
//     {
//         id: 3,
//         name: 'LD'
//     }
// ];

    public columns: any = [
        { name : 'Status'},
    ];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        topic: new FormControl(this.topic, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        topic: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private quizzesPageService: QuizzesPageService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getLotteries();
    }

    public getLotteries(searchParameters?: any): void {
        this.quizzesPageService.getQuizzes(searchParameters)
            .subscribe((res) => {
            console.log('res', res);
                this.tableData = res.quizzes;

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

    public createQuiz(): void {
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        this.name = item.name;
        this.status = item.status;
        this.id = item.id;
        // this.topic = item.topic;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public saveChanges(data): void {
        let quizForm = {
            id: data.id,
            name: data.name,
            status: data.status,
            // description: data.description
        };
        this.quizzesPageService.updateQuiz(quizForm)
            .subscribe((res) => {
                    this.getLotteries();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        let quizForm = {
            name: data.name,
            status: data.status,
            // topic: data.topic,
        };
        this.quizzesPageService.setQuiz(quizForm)
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
