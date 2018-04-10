import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialSharedModule } from 'app/core';

import { AdministratorsPageComponent } from './page';
import { AdministratorsPageRoutes } from './administrators-page.routes';
import { AdministratorsPageService } from "./page/services/administrators-page.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdministratorsPageRoutes,
    ],

    declarations: [
        AdministratorsPageComponent
    ],

    exports: [
        AdministratorsPageComponent
    ],

    providers: [
        AdministratorsPageService
    ]
})

export class AdministratorsPageModule { }

