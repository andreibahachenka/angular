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

import { NavMenuService, FileUploadService, UtilsService } from '../../../services';
import { SpecialQuizzesPageService } from './services/special-quizzes-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { UsersPageService } from '../../users/page/services/users-page.service';

@Component({
    selector: 'app-special-quizzes',
    styleUrls: ['special-quizzes-page.component.scss'],
    templateUrl: 'special-quizzes-page.component.html'
})
export class SpecialQuizzesPageComponent implements OnInit{

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];
    public userList: any[] = [];
    public currentQuiz: any = null;

    public editQuizMessage: string = 'Edit Special Quiz';
    public createQuizMessage: string = 'Create Special Quiz';
    public upload: string = 'Upload image';
    public sendToAllMessage: string = 'Are you sure you want to send it to all?';

    public specialQuiz = 'specialQuiz';
    public isImageUploaded = [];

    public name: string = '';
    public status: any;
    public id: string = '';
    public topic: any;
    public user: any;
    public questions: any;
    public backgroundImage: string = '';
    public isBackgroundImageUploaded: boolean = false;

    public text: string = '';
    public text1: string = '';
    public text2: string = '';
    public text3: string = '';
    public text4: string = '';

    public image: string = '';
    public image1: string = '';
    public image2: string = '';
    public image3: string = '';
    public image4: string = '';
    public image5: string = '';

    public answer: string = '';

    public answerForQuestion1: string = '';
    public answer1ForQuestion1: string = '';
    public answer2ForQuestion1: string = '';
    public answer3ForQuestion1: string = '';
    public answer4ForQuestion1: string = '';

    public answerForQuestion2: string = '';
    public answer1ForQuestion2: string = '';
    public answer2ForQuestion2: string = '';
    public answer3ForQuestion2: string = '';
    public answer4ForQuestion2: string = '';

    public answerForQuestion3: string = '';
    public answer1ForQuestion3: string = '';
    public answer2ForQuestion3: string = '';
    public answer3ForQuestion3: string = '';
    public answer4ForQuestion3: string = '';

    public answerForQuestion4: string = '';
    public answer1ForQuestion4: string = '';
    public answer2ForQuestion4: string = '';
    public answer3ForQuestion4: string = '';
    public answer4ForQuestion4: string = '';

    public answerForQuestion5: string = '';
    public answer1ForQuestion5: string = '';
    public answer2ForQuestion5: string = '';
    public answer3ForQuestion5: string = '';
    public answer4ForQuestion5: string = '';


    public objectKeys = Object.keys;

    @ViewChild('createModal') public createModal: ElementRef;
    @ViewChild('editModal') public editModal: ElementRef;
    @ViewChild('sendToAll') public sendToAll: ElementRef;
    @ViewChild('sendSQuizModal') public sendSQuizModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active'
    };

    public topics = {
        1: 'Winston',
        2: 'Camel',
        3: 'LD'
    };

    public columns: any = [
        { name : 'Status'},
    ];

    public images = [];

    public questionArray = ['questions', 'questions1', 'questions2', 'questions3', 'questions4'];
    public rightAnswers = [1, 2, 3 ,4];
    public answers = ['answer1', 'answer2', 'answer3', 'answer4'];

    public inputSQuizForm: FormGroup = new FormGroup({
        user: new FormControl('', Validators.required),
    });

    public inputEditForm: FormGroup = new FormGroup({
        name: new FormControl(this.name, Validators.required),
        topic: new FormControl(this.topic, Validators.required),
        status: new FormControl(this.status, Validators.required),
        id: new FormControl(this.id),
        backgroundImage: new FormControl(this.backgroundImage),
        questions: new FormGroup({
            number: new FormControl(1),
            text: new FormControl(this.text),
            image: new FormControl(this.image1),
            answer: new FormControl(this.answerForQuestion1),
            answer1: new FormControl(this.answer1ForQuestion1, Validators.required),
            answer2: new FormControl(this.answer2ForQuestion1, Validators.required),
            answer3: new FormControl(this.answer3ForQuestion1, Validators.required),
            answer4: new FormControl(this.answer4ForQuestion1, Validators.required),
        }),
        questions1: new FormGroup({
            number: new FormControl(2),
            text: new FormControl(this.text1, Validators.required),
            image: new FormControl(this.image2),
            answer: new FormControl(this.answerForQuestion2),
            answer1: new FormControl(this.answer1ForQuestion2, Validators.required),
            answer2: new FormControl(this.answer2ForQuestion2, Validators.required),
            answer3: new FormControl(this.answer3ForQuestion2, Validators.required),
            answer4: new FormControl(this.answer4ForQuestion2, Validators.required),
        }),
        questions2: new FormGroup({
            number: new FormControl(3),
            text: new FormControl(this.text2, Validators.required),
            image: new FormControl(this.image3),
            answer: new FormControl(this.answerForQuestion3),
            answer1: new FormControl(this.answer1ForQuestion3, Validators.required),
            answer2: new FormControl(this.answer2ForQuestion3, Validators.required),
            answer3: new FormControl(this.answer3ForQuestion3, Validators.required),
            answer4: new FormControl(this.answer4ForQuestion3, Validators.required),
        }),
        questions3: new FormGroup({
            number: new FormControl(4),
            text: new FormControl(this.text3, Validators.required),
            image: new FormControl(this.image4),
            answer: new FormControl(this.answerForQuestion4),
            answer1: new FormControl(this.answer1ForQuestion4, Validators.required),
            answer2: new FormControl(this.answer2ForQuestion4, Validators.required),
            answer3: new FormControl(this.answer3ForQuestion4, Validators.required),
            answer4: new FormControl(this.answer4ForQuestion4, Validators.required),
        }),
        questions4: new FormGroup({
            number: new FormControl(5),
            text: new FormControl(this.text4, Validators.required),
            image: new FormControl(this.image5),
            answer: new FormControl(this.answerForQuestion5),
            answer1: new FormControl(this.answer1ForQuestion5, Validators.required),
            answer2: new FormControl(this.answer2ForQuestion5, Validators.required),
            answer3: new FormControl(this.answer3ForQuestion5, Validators.required),
            answer4: new FormControl(this.answer4ForQuestion5, Validators.required),
        }),
    });

    public inputCreateForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        topic: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        backgroundImage: new FormControl(''),
        questions: new FormGroup({
            number: new FormControl(1),
            text: new FormControl(''),
            image: new FormControl(this.image),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions1: new FormGroup({
            number: new FormControl(2),
            text: new FormControl('', Validators.required),
            image: new FormControl(),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions2: new FormGroup({
            number: new FormControl(3),
            text: new FormControl('', Validators.required),
            image: new FormControl(),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions3: new FormGroup({
            number: new FormControl(4),
            text: new FormControl('', Validators.required),
            image: new FormControl(),
            answer: new FormControl(''),
            answer1: new FormControl('', Validators.required),
            answer2: new FormControl('', Validators.required),
            answer3: new FormControl('', Validators.required),
            answer4: new FormControl('', Validators.required),
        }),
        questions4: new FormGroup({
            number: new FormControl(5),
            text: new FormControl('', Validators.required),
            image: new FormControl(),
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
        private specialQuizzesPageService: SpecialQuizzesPageService,
        private fileUploadService: FileUploadService,
        private usersPageService: UsersPageService,
        private utilsService: UtilsService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getQuizzes();
        this.getUsers();
    }

    public getQuizzes(searchParameters?: any): void {
        this.specialQuizzesPageService.getQuizzes(searchParameters)
            .subscribe((res) => {
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
        this.inputCreateForm.reset();
        this.questionArray.map((item, i) => this.isImageUploaded[i] = false);
        this.isBackgroundImageUploaded = false;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openEdit(item: any): void {
        item.questions.map((item, i) => this.isImageUploaded[i] = true);
        this.isBackgroundImageUploaded = true;
        this.name = item.name;
        this.status = this.utilsService.getKeyByValue(this.statuses, item.status);
        this.id = item.id;
        this.topic = this.utilsService.getKeyByValue(this.topics, item.brand.name);
        this.backgroundImage = item.image;

        this.image1 = item.questions[0].image;
        this.image2 = item.questions[1].image;
        this.image3 = item.questions[2].image;
        this.image4 = item.questions[3].image;
        this.image5 = item.questions[4].image;

        this.text = item.questions[0].text;
        this.text1 = item.questions[1].text;
        this.text2 = item.questions[2].text;
        this.text3 = item.questions[3].text;
        this.text4 = item.questions[4].text;

        this.answerForQuestion1 = item.questions[0].answer;
        this.answer1ForQuestion1 = item.questions[0].answer1;
        this.answer2ForQuestion1 = item.questions[0].answer2;
        this.answer3ForQuestion1 = item.questions[0].answer3;
        this.answer4ForQuestion1 = item.questions[0].answer4;

        this.answerForQuestion2 = item.questions[1].answer;
        this.answer1ForQuestion2 = item.questions[1].answer1;
        this.answer2ForQuestion2 = item.questions[1].answer2;
        this.answer3ForQuestion2 = item.questions[1].answer3;
        this.answer4ForQuestion2 = item.questions[1].answer4;

        this.answerForQuestion3 = item.questions[2].answer;
        this.answer1ForQuestion3 = item.questions[2].answer1;
        this.answer2ForQuestion3 = item.questions[2].answer2;
        this.answer3ForQuestion3 = item.questions[2].answer3;
        this.answer4ForQuestion3 = item.questions[2].answer4;

        this.answerForQuestion4 = item.questions[3].answer;
        this.answer1ForQuestion4 = item.questions[3].answer1;
        this.answer2ForQuestion4 = item.questions[3].answer2;
        this.answer3ForQuestion4 = item.questions[3].answer3;
        this.answer4ForQuestion4 = item.questions[3].answer4;

        this.answerForQuestion5 = item.questions[4].answer;
        this.answer1ForQuestion5 = item.questions[4].answer1;
        this.answer2ForQuestion5 = item.questions[4].answer2;
        this.answer3ForQuestion5 = item.questions[4].answer3;
        this.answer4ForQuestion5 = item.questions[4].answer4;

        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.editModal });
    }

    public saveChanges(data): void {
        data.questions.image = this.image1;
        data.questions1.image = this.image2;
        data.questions2.image = this.image3;
        data.questions3.image = this.image4;
        data.questions4.image = this.image5;
        data.questions.number = 1;
        data.questions1.number = 2;
        data.questions2.number = 3;
        data.questions3.number = 4;
        data.questions4.number = 5;
        let quizForm = {
            id: data.id,
            name: data.name,
            status: data.status,
            brand: data.topic = {
                id: data.topic,
                name: this.topics[data.topic]
            },
            image: this.backgroundImage,
            questions: [data.questions, data.questions1, data.questions2, data.questions3, data.questions4]
        };
        this.specialQuizzesPageService.updateQuiz(quizForm)
            .subscribe((res) => {
                    this.getQuizzes();
                    this.images = [];
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        //converting to necessary object
        data.questions.image = this.images[0];
        data.questions1.image = this.images[1];
        data.questions2.image = this.images[2];
        data.questions3.image = this.images[3];
        data.questions4.image = this.images[4];
        data.questions.number = 1;
        data.questions1.number = 2;
        data.questions2.number = 3;
        data.questions3.number = 4;
        data.questions4.number = 5;
        let quizForm = {
            name: data.name,
            status: data.status,
            brand: data.topic = {
                id: data.topic,
                name: this.topics[data.topic]
            },
            image: this.backgroundImage,
            questions: [data.questions, data.questions1, data.questions2, data.questions3, data.questions4]
        };

        this.specialQuizzesPageService.setQuiz(quizForm)
            .subscribe((res) => {
                    this.getQuizzes();
                    this.inputCreateForm.reset();
                    this.images = [];
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public cancel(): void {
        this.inputCreateForm.reset();
        this.inputEditForm.reset();
        this.inputSQuizForm.reset();
        this.images = []
        this.modalWindowService.closeModalWindow();
    }

    public handleFileInput(files: FileList, index): void {
        let photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            .subscribe((result: any) => {
                this.images[index] = result.url;
                this.isImageUploaded[index] = true;
                },
            (err) => {
                console.log(err);
                this.isImageUploaded[index] = false;
            })
    }

    public handleFileInputForBackground(files: FileList, index): void {
        let photo = files.item(0);
        this.fileUploadService.uploadFile(photo)
            .subscribe((result: any) => {
                    this.backgroundImage = result.url;
                    this.isBackgroundImageUploaded = true;
                },
                (err) => {
                    console.log(err);
                    this.isBackgroundImageUploaded = false;
                })
    }

    public openSend(item) {
        this.id = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.sendToAll });
    }

    public applySend(id) {
        console.log(id);
        this.specialQuizzesPageService.sendToAll(id)
            .subscribe((res) => {
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public getUsers(searchParameters?: any): void {
        this.usersPageService.getUser(searchParameters)
            .subscribe((res) => {
                this.userList = res.users;
            });
    }

    public openSendToUser(item) {
        this.currentQuiz = item;
        this.inputSQuizForm.reset();
        // this.getUsers();
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.sendSQuizModal });
    }

    public applySendToUser(data) {
        console.log(data);
        console.log(this.currentQuiz);

        this.specialQuizzesPageService.sendToUser({user_id: data.user, pack_id: this.currentQuiz.id})
            .subscribe((res) => {
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }
}
