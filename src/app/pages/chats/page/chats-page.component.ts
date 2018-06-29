/// <reference path="../../../../../typings/globals/jquery/index.d.ts" />
/// <reference path="../../../../../typings/globals/socket.io-client/index.d.ts" />
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

import { NavMenuService, UtilsService, NotificationService } from '../../../services';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { ChatsPageService } from './services/chats-page.service';
import { SpecialQuizzesPageService } from '../../special-quizzes/page/services/special-quizzes-page.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';

declare var $: JQueryStatic;

@Component({
    selector: 'app-chats',
    styleUrls: ['chats-page.component.scss'],
    templateUrl: 'chats-page.component.html',
})
export class ChatsPageComponent implements OnInit {

    continentOptions: any[] = [];
    countriesOptions: any[] = [];
    statesOptions: any[] = [];
    senderUsers: any[] = [];
    filter: number = 0;
    sendToAll: boolean = false;
    squizzes: any[] = [];
    squiz: any;

    filterList: any[] = [
        {id: 0, name: `All`},
        {id: 1, name: `New`},
        {id: 2, name: `Marked`},
    ];

    error: any[];
    chatList: any = [];
    filteredChatList: any = [];
    messageList: any[] = [];
    createLoading: boolean = false;
    connection: any;

    loadingChats: boolean = false;
    loadingMessages: boolean = false;

    public messageLoadMoreVisible: boolean = true;

    public messageForm: FormGroup;
    public searchForm: FormGroup;
    public sQuizForm: FormGroup;

    public timeCorrect: number;
    public defaultDate: any;

    // private socketUrl = 'http://localhost:8041';
    public socketUrl = 'https://jticonnect.pr3.eu:8042';
    public socket: any = null;

    public currentChat: any = null;
    public lastMessageId = null;
    public visibleChatsMore = true;

    public message: any;

    public myPhotoUrl = localStorage.getItem('photo');
    public userId: number = 1;

    public chatLimit = 5000;
    public chatOffset = 0;

    public user_id = null;

    public uId = null;

    public userOptions: any = [];

    @ViewChild('sendSQuizModal') public sendSQuizModal: ElementRef;

    public inputSQuizForm: FormGroup = new FormGroup({
        squiz: new FormControl('', Validators.required),
    });

    constructor(fb: FormBuilder,
                private _chatServices: ChatsPageService,
                private specialQuizzesPageService: SpecialQuizzesPageService,
                private modalWindowService: ModalWindowService) {
        this.searchForm = fb.group({
            user: ['', Validators.required],
        });
        this.messageForm = fb.group({
            message: ['', Validators.required],
            sendToAll: [false],
        });
    }

    public moveInArray(arr, fromIndex, toIndex) {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    public conversationsSort() {
        this.chatList.sort((a, b) => {
            if (a['last_message_ts'] < b['last_message_ts']) {
                return 1;
            }
            else if (a['last_message_ts'] > b['last_message_ts']) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    public initSockets() {
        let self = this;

        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.src = 'https://cdn.socket.io/socket.io-1.4.5.js';
        script.type = 'text/javascript';
        head.appendChild(script);

        script.onload = () => {
            self.socket = io.connect(self.socketUrl, {
                secure: true,
                query: 'token=' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUyMzYyNzQ2MH0.yJg0i_SnnfeRNupVPD620x8Yy3nVSXZx_j_RiswdNOI',
                transports: ['polling', 'websocket', 'flashsocket']
            });
            self.socket.heartbeatTimeout = 10000;
            self.socket.heartbeatInterval = 10000;

            self.socket.on('connect', () => {
                console.log('Socket connected');

                // self.socket.emit('connectchat', self.userId, self.currentChat.id);

                self.socket.on('sentmessage', (data) => {

                    // let message = JSON.parse(data);
                    self.getMessageFromSocket(data);
                    console.log('New message: ', data);

                });
            });
        };
    }


    public ngOnInit() {
        this.defaultDate = new Date();
        this.defaultDate.setHours(12);
        this.defaultDate.setMinutes(0);
        this.defaultDate.setSeconds(0);
        this.timeCorrect = this.defaultDate.getTimezoneOffset() / -60;
        this.getChats();
        this.initSockets();
    }

    public getQuizzes(searchParameters?: any): void {
        this.specialQuizzesPageService.getQuizzesList(searchParameters)
            .subscribe((res) => {
                this.squizzes = res.quizzes;
            });
    }

    public getChats(inc = false) {

        this.loadingChats = true;

        let request = {
            // offset: this.chatOffset,
            limit: this.chatLimit,
        };

        this._chatServices.getChats(request).subscribe((response) => {

            if (response) {

                if (!inc) {
                    this.chatList = [];
                }

                response.forEach((chat) => {
                    if (chat['last_message']) {
                        chat['last_message'] = chat['last_message'] ? JSON.parse(chat['last_message']).text : '';
                    } else {
                        chat['last_message'] = '';
                    }

                    chat['last_message_ts'] = chat['last_message_date'] ? new Date(chat['last_message_date']).getTime() : 0;
                    chat['last_message_date'] = (new Date(chat['last_message_date']));
                    chat['last_message_date'] = chat['last_message_date'].toLocaleString('en-US', {hour12: false});

                    chat['nameToDisplay'] = `${chat['companion']['name']} ${chat['companion']['surname']}(${chat['companion']['id']}) ${chat['companion']['phone']}`;
                    chat['newMessages'] = chat['friend_unread'] > 0;

                    this.chatList.push(chat);

                    this.chatOffset++;
                });

                this.conversationsSort();

                if (this.chatList.length < this.chatLimit) {
                    this.visibleChatsMore = false;
                }

                if (this.chatList.length > 0) {
                    this.currentChat = this.chatList[0];
                }

            }

            this.loadingChats = false;
        });
    }


    public getMessages(chatId, socket = false) {

        this.chatList.forEach((chat) => {
            if (chat.id === chatId) {
                chat['newMessages'] = false;
                chat['last_message'] = '';
                this.currentChat = chat;
            }
        });

        let messageText = ``;

        this.loadingMessages = true;

        let request = {
            chat_id: chatId,
            socket: socket
        };

        this._chatServices.getMessages(request).subscribe((response) => {

            if (response['messages']) {

                this.messageList = [];
                response['messages'].reverse();

                response['messages'].forEach((message) => {
                    message['created_at'] = (new Date(message['created_at']));
                    // message['created_at'].setHours(message['created_at'].getHours() + this.timeCorrect);
                    message['created_at'] = message['created_at'].toLocaleString('en-US', {hour12: false});

                    message['text'] = message['message'] ? message['message']['text'] : 'Error.';

                    if (message['message']['image']) {
                        message['text'] = `${message['text']} (Image: ${message['message']['image']['url']})`;
                    }

                    messageText = message['text'];

                    this.messageList.push(message);

                });
            }

            this.chatList.forEach((chat) => {
                if (chat.id === chatId) {
                    chat['newMessages'] = false;
                    chat['last_message'] = messageText;
                    this.currentChat = chat;
                }
            });

            this.scrollToBottom();
            this.loadingMessages = false;
        });
    }

    public getMessageFromSocket(chatId) {

        console.log(chatId);

        // message['created_at'] = new Date(message['ts']);
        // message['created_at'].setHours(message['created_at'].getHours() + this.timeCorrect);
        // message['created_at'] = message['created_at'].toLocaleString('en-US', {hour12: true});
        //
        // message['text'] = message['scope'] && message['scope']['text'] ? message['scope']['text'] : 'Error.';

        /* Add message to message list */

        // if (this.currentChat && this.currentChat.conversationId === message.conversationId) {
        //     this.messageList.push(message);
        //     this.scrollToBottom();
        // }

        /* Update and sort conversations */
        let chatIndex = 0;
        this.chatList.forEach((chat) => {
            if (chat.id === chatId) {
                chat['last_message_ts'] = Date.now();
                chat['last_message_date'] = ( new Date(chat['last_message_ts']));
                chat['last_message_date'] = chat['last_message_date'].toLocaleString('en-US', {hour12: false});
                // chat['last_message'] = message['text'];
                if (this.currentChat.id !== chatId) {
                    chat['newMessages'] = true;
                    chat['last_message'] = 'New message!';
                } else {
                    this.getMessages(chatId, true);
                }
                this.conversationsSort();
            }
            chatIndex++;
        });
    }

    public sendMessage() {

        if (this.messageForm.invalid) {
            return false;
        }

        const request =  {
                message: {
                    text: this.messageForm.get('message').value,
                    image: null,
                    link: '',
                    bottom_text: '',
                    brand_id: 0
                },
                type: 4,
                user_id: this.currentChat.companion.id
            };

        this.loadingMessages = true;

        if (this.sendToAll) {

            this._chatServices.sendMessageAll(request).subscribe((response) => {

                this.getMessages(this.currentChat.id);

                this.messageForm.get('message').setValue('');

                this.loadingMessages = false;

                this.sendToAll = false;

                this.scrollToBottom();
            });


        } else {
            this._chatServices.sendMessage(request).subscribe((response) => {

                let message = response;

                message['time'] = new Date(message['created_at']);
                message['created_at'] = (new Date(message['created_at']));
                // message['created_at'].setHours(message['created_at'].getHours() + this.timeCorrect);
                message['created_at'] = message['created_at'].toLocaleString('en-US', {hour12: false});

                message['text'] = message['message'] ? message['message']['text'] : 'Error.';

                this.messageList.push(message);

                let chatIndex = 0;
                this.chatList.forEach((chat) => {
                    if (chat.id === this.currentChat.id) {
                        chat['last_message_ts'] = message['time'].getTime();
                        chat['last_message_date'] =  message['created_at'];
                        chat['last_message_date'] = chat['last_message_date'].toLocaleString('en-US', {hour12: false});
                        chat['last_message'] = this.messageForm.get('message').value;
                        // chat['count_unread'] = 0;
                        // this.moveInArray(this.chatList, chatIndex, 0);
                        this.conversationsSort();
                        this.currentChat = chat;
                    }
                    chatIndex++;
                });

                this.messageForm.get('message').setValue('');

                this.loadingMessages = false;

                this.scrollToBottom();
            });
        }


        return true;
    }

    public markChat() {
        if (this.currentChat) {
            this.currentChat.marked = this.currentChat.marked === 1 ? 0 : 1;

            this._chatServices.markChat({
                    chat_id: this.currentChat.id,
                    marked: this.currentChat.marked
                }
            ).subscribe();
        }
    }

    public openSpecial() {
        this.inputSQuizForm.reset();
        this.getQuizzes();
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.sendSQuizModal });
    }

    public mouseEnter() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.add('chat-overflow');
    }

    public mouseLeave() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('chat-overflow');
    }

    public scrollToBottom() {
        setTimeout(() => {
            $('#bottom-area')[0].scrollIntoView(false);
        });
    }

}
