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

import { NavMenuService } from '../../../services';
import { OrdersPageService } from './services/orders-page.service';
import { NavItemModel } from './../../../components/nav-menu/models';
import { ModalWindowService } from '../../../components/modal-window/services/modal-window.service';

@Component({
    selector: 'app-orders',
    styleUrls: ['orders-page.component.scss'],
    templateUrl: 'orders-page.component.html',
})
export class OrdersPageComponent implements OnInit{

    public tableData: any[] = [];
    public modifiedTableData: any[] = [];
    public navItems: NavItemModel[];

    public createOrderMessage: string = 'Create Order';
    public deleteMessage: string = 'Are you sure you want to delete this order?';
    public upload: string = 'Upload image';

    public username: string = '';
    public presents: any;
    public id: string = '';

    public objectKeys = Object.keys;

    @ViewChild('deleteModal') public deleteModal: ElementRef;
    @ViewChild('createModal') public createModal: ElementRef;

    public statuses = {
        1: 'Active',
        0: 'Not Active',
        2: 'Waiting moderation'
    };

    public inputCreateForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        presents: new FormControl('', Validators.required)
    });

    constructor(
        private navMenuService: NavMenuService,
        private modalWindowService: ModalWindowService,
        private ordersPageService: OrdersPageService
    ) {
    }

    public ngOnInit() {
        this.navMenuService.getMainNavMenu()
            .subscribe((navListData: NavItemModel[]) => this.navItems = navListData);

        this.getOrders();
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

    public createOrder(): void {
        this.inputCreateForm.reset();
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
        let lotteryForm = {
            name: data.username,
            status: data.status,
        };
        this.ordersPageService.setOrder(lotteryForm)
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
        this.modalWindowService.closeModalWindow();
    }

}
