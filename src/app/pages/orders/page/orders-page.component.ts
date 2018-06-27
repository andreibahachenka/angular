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

import { NavMenuService, NotificationService } from '../../../services';
import { OrdersPageService } from './services/orders-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';
import { PresentsPageService } from '../../presents/page/services/presents-page.service';
import { UsersPageService } from '../../users/page/services/users-page.service';

@Component({
    selector: 'app-orders',
    styleUrls: ['orders-page.component.scss'],
    templateUrl: 'orders-page.component.html',
})
export class OrdersPageComponent implements OnInit {

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];
    public presentList: any[] = [];
    public userList: any[] = [];

    public createOrderMessage: string = 'Create Order';
    public deleteMessage: string = 'Are you sure you want to delete this order?';
    public upload: string = 'Upload image';

    //model user
    public name: string = '';
    public surname: string = '';
    public coins: any = '';

    public username: string = '';
    public present: any;
    public user: any;
    public id: string = '';
    public isUserSelected: boolean = false;

    public filterUserPhone: string = '';
    public filterProductId: string = '';
    public filterStartDate: string = '';
    public filterEndDate: string = '';

    public objectKeys = Object.keys;

    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public inputCreateForm: FormGroup = new FormGroup({
        present: new FormControl('', Validators.required),
        user: new FormControl('', Validators.required),
    });

    public inputFilterForm: FormGroup = new FormGroup({
        user_phone: new FormControl(''),
        product_id: new FormControl(''),
        start_date: new FormControl(''),
        end_date: new FormControl(''),
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private ordersPageService: OrdersPageService,
        private presentsPageService: PresentsPageService,
        private usersPageService: UsersPageService,
        private notificationService: NotificationService,
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getOrders();
    }

    public handleUserSelect(event) {
        if (event) {
            this.isUserSelected = true;
            this.name = event.name;
            this.surname = event.surname;
            this.coins = event.coins;
        } else {
            this.isUserSelected = false;
        }
    }

    public getOrders(searchParameters?: any): void {
        this.ordersPageService.getOrders(searchParameters)
            .subscribe((res) => {
                this.tableData = res.orders;

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

    public getPresents(searchParameters?: any): void {
        this.presentsPageService.getPresents(searchParameters)
            .subscribe((res) => {
                this.presentList = res.products;
            });
    }

    public getUsers(searchParameters?: any): void {
        this.usersPageService.getUser(searchParameters)
            .subscribe((res) => {
                this.userList = res.users;
            });
    }

    public filterData(searchParameters): void {
        console.log(this.inputFilterForm.value);

        let data = {
            start_date: '',
            end_date: '',
            user_phone: this.inputFilterForm.value.user_phone,
            product_id: this.inputFilterForm.value.product_id,
        };

        let startDate = new Date(this.inputFilterForm.value.start_date);
        let finishDate = new Date(this.inputFilterForm.value.end_date);

        if (this.filterStartDate !== '') {
            data.start_date = startDate.getFullYear() + '-' + Number(startDate.getMonth() + 1) + '-' + startDate.getDate();
        }
        if (this.filterEndDate !== '') {
            data.end_date = finishDate.getFullYear() + '-' + Number(finishDate.getMonth() + 1) + '-' + finishDate.getDate();
        }

        this.ordersPageService.getOrders(data)
            .subscribe((res) => {
                this.tableData = res.orders;

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

    public createOrder(): void {
        this.inputCreateForm.reset();
        this.getPresents();
        this.getUsers();
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.createModal });
    }

    public openDelete(item: any): void {
        this.id = item.id;
        this.modalWindowService.showModalWindow({ outsideClose: true, content: this.deleteModal });
    }

    public applyDelete(id): void {
        this.ordersPageService.deleteOrder(id)
            .subscribe((res) => {
                    this.getOrders();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public sendCreateForm(data): void {
        let orderForm = {
            product_id: data.present,
            user_id: data.user,
        };
        this.ordersPageService.setOrder(orderForm)
            .subscribe((res) => {
                    this.getOrders();
                    this.modalWindowService.closeModalWindow();
                },
                (err) => {
                    console.error(err);
                })
    }

    public cancel(): void {
        this.inputCreateForm.reset();
        this.isUserSelected = false;
        this.modalWindowService.closeModalWindow();
    }

    public clearForm(): void {
        this.inputFilterForm.reset();
        this.filterStartDate = '';
        this.filterEndDate = '';
    }

}
