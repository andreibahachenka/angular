import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalWindowState } from './models';
import { ModalWindowService } from './services';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ModalWindowComponent implements OnInit, OnDestroy {
    public modalState: ModalWindowState;

    @ViewChild('modalWindowContainer')
    public modalWindowContainer: ElementRef;

    private stateSubscribtion: Subscription;

    constructor(
        private modalWindowService: ModalWindowService
    ) {
    }

    public ngOnInit() {
        this.stateSubscribtion = this.modalWindowService.getModalState()
            .subscribe((modalState) => {
                this.windowVisibility(!modalState.display);
                this.modalState = modalState;
            });
    }

    public ngOnDestroy() {
        this.stateSubscribtion.unsubscribe();
    }

    public outsideCLick(elem: HTMLElement): void {
        if (this.modalState.config.outsideClose && elem.classList.contains('modal-background')) {
            this.modalWindowService.closeModalWindow();
        }
    }

    public closeWindow(): void {
        this.modalWindowService.closeModalWindow();
    }

    private windowVisibility(isHidden: boolean): void {
        if (isHidden) {
            this.modalWindowContainer.nativeElement.classList.add('unmount');
        } else {
            this.modalWindowContainer.nativeElement.classList.remove('unmount');
            this.modalWindowContainer.nativeElement.classList.add('mount');
        }
    }
}
