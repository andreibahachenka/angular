import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RestApiService, NotificationService } from '../../../../services';
import { PathConfig } from './../../../../../app-config/path.config';

const errorMessage = 'Erorr loading data';

@Injectable()
export class ReportsPageService {
    constructor(
        private restApiService: RestApiService,
        private notificationService: NotificationService
    ) {
    }

    public getSpecialQuizzesForReport(params?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getSpecialQuizzesReportEndpoint}`, params,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadSpecialQuizzesForReport(params?: any): Observable<any> {
        console.log('params', params);
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadSpecialQuizzesReportEndpoint}`, params,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getGamesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getGamesReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadGamesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadGamesReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getLotteriesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getLotteriesReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadLotteriesForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadLotteriesReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getOrdersForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getOrdersReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadOrdersForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadOrdersReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getRatingsForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getRatingsReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadRatingsForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadRatingsReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getUsersForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getUsersReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadUsersForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadUsersReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public getQuestsForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.getQuestsReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }

    public downloadQuestsForReport(data?: any): Observable<any> {
        return new Observable((observer) => {
            this.restApiService.postItem(
                `${PathConfig.downloadQuestsReportEndpoint}`, data,
                (err) => {
                    this.notificationService.error(errorMessage);
                    console.error(err);
                }
            ).first()
                .subscribe((res) => {
                    observer.next(res);
                });
        })
    }
}
