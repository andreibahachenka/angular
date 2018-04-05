import { ModalWindowConfig } from './modal-window-config.model';

export class ModalWindowState {
    constructor(
        public display: boolean = false,
        public config: ModalWindowConfig = {
            outsideClose: true
        }
    ) {
    }
}
