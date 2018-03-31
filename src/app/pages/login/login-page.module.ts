import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialSharedModule } from 'app/core';

import { LoginPageComponent } from './page';
import { LoginPageRoutes } from './login-page.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginPageRoutes,
    ],

    declarations: [
        LoginPageComponent
    ],

    exports: [
        LoginPageComponent
    ],

    providers: [
    ]
})

export class LoginPageModule { }

