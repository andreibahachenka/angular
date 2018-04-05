import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialSharedModule } from 'app/core';

import { AdminPageComponent } from './page';
import { AdminPageRoutes } from './admin-page.routes';
import { AdminPageService } from "./page/services/admin-page.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminPageRoutes,
    ],

    declarations: [
        AdminPageComponent
    ],

    exports: [
        AdminPageComponent
    ],

    providers: [
        AdminPageService
    ]
})

export class AdminPageModule { }

