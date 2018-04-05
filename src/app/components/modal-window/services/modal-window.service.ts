import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ModalWindowState, ModalWindowConfig } from '../models';

@Injectable()
export class ModalWindowService {
    private modalState: BehaviorSubject<ModalWindowState> = new BehaviorSubject(new ModalWindowState());
    private windowAction: Subject<boolean> = new Subject();

    public showModalWindow(config?: ModalWindowConfig): Subject<boolean> {
        if (config && config.content) {
            this.displayContent(config.content, true);
        }
        this.modalState.next(new ModalWindowState(true, config));
        return this.windowAction;
    }

    public closeModalWindow(): void {
        this.displayContent(this.modalState.getValue().config.content, false);
        this.windowAction = new Subject();
        this.modalState.next(new ModalWindowState(false));
    }

    public getModalState(): BehaviorSubject<ModalWindowState> {
        return this.modalState;
    }

    public setWindowAction(value: boolean): void {
        this.windowAction.next(value);
    }

    public displayContent(contentRef: ElementRef, display: boolean): void {
        (contentRef.nativeElement as HTMLElement).style.display = display ? 'block' : 'none';
    }
}
