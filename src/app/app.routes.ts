import { Routes } from '@angular/router';
import { RoutesConfig } from './../app-config/routes.config';

import { AdminComponent } from './components/';

import { AuthGuard } from './guards/auth.guard';

import {
    LoginPageComponent,
    UsersPageComponent,
    LotteriesPageComponent,
    AdministratorsPageComponent,
    QuizzesPageComponent
} from './pages';

export const ROUTES: Routes = [
    { path: '', redirectTo: RoutesConfig.login, pathMatch: 'full' },

    { path: RoutesConfig.login, component: LoginPageComponent },

    { path: '', component: AdminComponent, canActivate: [AuthGuard], children: [

        { path: RoutesConfig.adminUsers, component: UsersPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminAdministrators, component: AdministratorsPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminLotteries, component: LotteriesPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminQuizzes, component: QuizzesPageComponent, canActivate: [AuthGuard] },
        ]
    },

    { path: '**', redirectTo: RoutesConfig.login, pathMatch: 'full' }
];
