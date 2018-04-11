import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialSharedModule } from 'app/core';

import { UsersPageComponent } from './page';
import { UsersPageRoutes } from './users-page.routes';
import { UsersPageService } from "./page/services/users-page.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UsersPageRoutes,
    ],

    declarations: [
        UsersPageComponent
    ],

    exports: [
        UsersPageComponent
    ],

    providers: [
        UsersPageService
    ]
})

export class UsersPageModule { }

