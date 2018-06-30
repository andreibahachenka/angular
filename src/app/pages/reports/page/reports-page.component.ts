import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

import { NavMenuService } from '../../../services';
import { ReportsPageService } from './services/reports-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { MatTabChangeEvent } from '@angular/material';
import { QuizzesPageService } from './../../quizzes/page/services/quizzes-page.service';
import { LotteriesPageService } from './../../lotteries/page/services/lotteries-page.service';
import { QuestsPageService } from './../../quests/page/services/quests-page.service';

@Component({
    selector: 'app-reports',
    styleUrls: ['reports-page.component.scss'],
    templateUrl: 'reports-page.component.html'
})
export class ReportsPageComponent implements OnInit {
    constructor(
        private reportsPageService: ReportsPageService,
        private navMenuService: NavMenuService,
        private quizzesPageService: QuizzesPageService,
        private lotteriesPageService: LotteriesPageService,
        private questsPageService: QuestsPageService
    ){}

    public navItems: NavItemModel[];
    public specialQuizTableData = [];
    public gamesTableData = [];
    public gamesCount = 0;
    public gamesOffset = 0;
    public usersTableData = [];
    public lotteriesTableData = [];
    public questsTableData = [];
    public ordersTableData = [];
    public ratingsTableData = [];
    public quizzes: any[] = [];
    public lotteriesArray: any[] = [];
    public questsArray: any[] = [];

    public timeCorrect: number;
    public defaultDate: any;

    public objectKeys = Object.keys;
    public quiz_id: string;
    public intervalFilter: any;
    public interval: any;
    public intervals: any = ['All', 'week'];
    public lottery_id: string;
    public quest_id: string;
    public games: string = 'games';
    public users: string = 'users';
    public lotteries: string = 'lotteries';
    public quests: string = 'quests';
    public specialquizzes: string = 'specialquizzes';
    public orders: string = 'orders';
    public ratings: string = 'ratings';

    public columns: any = [
    ];


    public ngOnInit() {
        this.defaultDate = new Date();
        this.defaultDate.setHours(12);
        this.defaultDate.setMinutes(0);
        this.defaultDate.setSeconds(0);
        this.timeCorrect = this.defaultDate.getTimezoneOffset() / -60;

        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.reportsPageService.getSpecialQuizzesForReport()
            .subscribe((res) => {
                this.specialQuizTableData = res.rows;
            });
        this.quizzesPageService.getQuizzes()
            .subscribe((res) => {
                this.quizzes = res.quizzes;
                let objectForAll = { name: 'All', id: 0 };
                this.quizzes.push(objectForAll);
            });
        this.lotteriesPageService.getLotteries()
            .subscribe((res) => {
                this.lotteriesArray = res.lotteries.map((lottery) => {
                    lottery.name = `${lottery.name}(${lottery.id})`;
                    return lottery;
                });
                let objectForAll = { name: 'All', id: 0 };
                this.lotteriesArray.push(objectForAll);
            });
        this.questsPageService.getQuests()
            .subscribe((res) => {
                this.questsArray = res.quests.map((quest) => {
                    quest.name = `${quest.name}(${quest.id})`;
                    return quest;
                });
                // let objectForAll = { name: 'All', id: 0 };
                // this.lotteriesArray.push(objectForAll);
            });
    }

    public getReports(event: any, data?: any) {
        switch(event.index) {
            case 0 : this.reportsPageService.getSpecialQuizzesForReport(data)
                .subscribe((res) => {
                    this.specialQuizTableData = res.rows;
                });
                break;
            case 1 : this.reportsPageService.getGamesForReport(data)
                .subscribe((res) => {
                    this.gamesTableData = res.rows;
                    this.gamesCount = res.count;
                });
                break;
            // case 2 : this.reportsPageService.getLotteriesForReport(data)
            //     .subscribe((res) => {
            //         this.lotteriesTableData = res.rows;
            //     });
            //     break;
            case 2 : this.reportsPageService.getOrdersForReport(data)
                .subscribe((res) => {
                    this.ordersTableData = res.rows;
                });
                break;
            case 3 : this.reportsPageService.getRatingsForReport(data)
                .subscribe((res) => {
                    this.ratingsTableData = res.rows;
                });
                break;
            case 4 : this.reportsPageService.getUsersForReport(data)
                .subscribe((res) => {
                    this.usersTableData = res.rows;
                });
                break;
        }
    }

    public filterData(from, to, download = false) {
        let quiz_id= this.quiz_id || '';
        let startDate = new Date(from);
        let finishDate = new Date(to);
        let start_date = '';
        let end_date = '';
        if (from != null) {
            start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (to != null) {
            end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }
        let params = {
            start_date,
            end_date,
            quiz_id,
            time: this.timeCorrect
        };

        if (!download) {
            this.reportsPageService.getSpecialQuizzesForReport(params)
                .subscribe((res) => {
                    this.specialQuizTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadSpecialQuizzesForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForGame(from, to, download = false, event = null, filter = false) {

        if (filter) {
            this.gamesOffset = 0;
        }

        let startDate = new Date(from);
        let finishDate = new Date(to);
        let start_date = '';
        let end_date = '';
        if (from != null) {
            start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (to != null) {
            end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }
        let params = {
            start_date,
            end_date,
            offset: (event && event.offset) ? event.offset : 0,
            time: this.timeCorrect
        };

        if (!download) {
            this.gamesOffset = event && event.offset ? event.offset : 0;
            this.reportsPageService.getGamesForReport(params)
                .subscribe((res) => {
                    this.gamesTableData = res.rows;
                    this.gamesCount = res.count;
                })
        } else {
            this.reportsPageService.downloadGamesForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForOrders(from, to, download = false) {
        let startDate = new Date(from);
        let finishDate = new Date(to);
        let start_date = '';
        let end_date = '';
        if (from != null) {
            start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (to != null) {
            end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }
        let params = {
            start_date,
            end_date,
            time: this.timeCorrect
        };

        if (!download) {
            this.reportsPageService.getOrdersForReport(params)
                .subscribe((res) => {
                    this.ordersTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadOrdersForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForLottery(download = false) {
        let lottery_id= this.lottery_id || '';
        let params = {
            lottery_id
        };

        if (!download) {
            this.reportsPageService.getLotteriesForReport(params)
                .subscribe((res) => {
                    this.lotteriesTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadLotteriesForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForRating(intervalFilter, download = false) {
        let type = intervalFilter || '';
        let params = {
            type
        };

        if (!download) {
            this.reportsPageService.getRatingsForReport(params)
                .subscribe((res) => {
                    this.ratingsTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadRatingsForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForUser(from, to, download = false) {
        let startDate = new Date(from);
        let finishDate = new Date(to);
        let start_date = '';
        let end_date = '';
        if (from != null) {
            start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (to != null) {
            end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }
        let params = {
            start_date,
            end_date,
            time: this.timeCorrect
        };

        if (!download) {
            this.reportsPageService.getUsersForReport(params)
                .subscribe((res) => {
                    this.usersTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadUsersForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }

    public filterDataForQuest(download = false) {
        let quest_id= this.quest_id || '';
        let params = {
            quest_id
        };

        if (!download) {
            this.reportsPageService.getQuestsForReport(params)
                .subscribe((res) => {
                    this.questsTableData = res.rows;
                })
        } else {
            this.reportsPageService.downloadQuestsForReport(params)
                .subscribe((res) => {
                    if (res.url) {
                        window.location.href = res.url;
                    }
                })
        }
    }
}