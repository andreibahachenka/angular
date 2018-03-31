import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialSharedModule } from 'app/core';

import { AdminPageComponent } from './page';
import { AdminPageRoutes } from './admin-page.routes';
// import { Services } from './page/services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminPageRoutes,
    ],

    declarations: [
        AdminPageComponent
    ],

    exports: [
        AdminPageComponent
    ],

    providers: [
        // FileUploadService,
        // FileImportService
    ]
})

export class AdminPageModule { }

