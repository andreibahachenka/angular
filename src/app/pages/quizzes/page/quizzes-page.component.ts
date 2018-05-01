import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import {
    FormGroup,
    FormControl,
    Validators,
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
    public topic = {};
    public questions: any;
    public text = '';

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

    public columns: any = [
        { name : 'Status'},
    ];

    public questionArray = ['questions', 'questions1', 'questions2', 'questions3', 'questions4'];
    public rightAnswers = [1, 2, 3 ,4];
    public answers = ['answer1', 'answer2', 'answer3', 'answer4'];

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        topic: new FormControl(this.topic, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        topic: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        questions: new FormGroup({
            number: new FormControl(1),
            text: new FormControl(''),
            image: new FormControl(''),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions1: new FormGroup({
            number: new FormControl(2),
            text: new FormControl('', Validators.required),
            image: new FormControl(''),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions2: new FormGroup({
            number: new FormControl(3),
            text: new FormControl('', Validators.required),
            image: new FormControl(''),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions3: new FormGroup({
            number: new FormControl(4),
            text: new FormControl('', Validators.required),
            image: new FormControl(''),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions4: new FormGroup({
            number: new FormControl(5),
            text: new FormControl('', Validators.required),
            image: new FormControl(''),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private quizzesPageService: QuizzesPageService,
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
        this.topic = item.brand.name;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public saveChanges(data): void {
        let quizForm = {
            id: data.id,
            name: data.name,
            status: data.status,
            brand: data.topic = {
                id: data.topic,
                name: this.topics[data.topic]
            }
        };
        console.log('quizForm', quizForm);
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
            brand: data.topic = {
                id: data.topic,
                name: this.topics[data.topic]
            },
            questions: [data.questions, data.questions1, data.questions2, data.questions3, data.questions4]
        };
        console.log('DATA',data);
        console.log('quizForm', quizForm);
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
