import { Component, OnInit } from '@angular/core';
import {NavMenuService} from "./services/nav-menu.service";
import {NavItemModel} from "./components/nav-menu/models/nav-menu.model";
import {ModalWindowService} from "./components/modal-window/services/modal-window.service";

import { ModalWindowState } from './components/modal-window/models/modal-window-state.model';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public modalWindowState: ModalWindowState;

  constructor(
      private modalWindowService: ModalWindowService
  ) {}

  public ngOnInit() {
    this.modalWindowService.getModalState()
        .subscribe((modalState: ModalWindowState) => {
          this.modalWindowState = modalState;
        });
  }
}
