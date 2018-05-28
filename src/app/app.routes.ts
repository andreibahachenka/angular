import { Routes } from '@angular/router';
import { RoutesConfig } from './../app-config/routes.config';

import { AdminComponent } from './components/';

import { AuthGuard } from './guards/auth.guard';

import {
    LoginPageComponent,
    UsersPageComponent,
    LotteriesPageComponent,
    AdministratorsPageComponent,
    QuizzesPageComponent,
    SpecialQuizzesPageComponent,
    GamesPageComponent,
    OrdersPageComponent,
    PresentsPageComponent,
    SettingsPageComponent
} from './pages';

export const ROUTES: Routes = [
    { path: '', redirectTo: RoutesConfig.login, pathMatch: 'full' },

    { path: RoutesConfig.login, component: LoginPageComponent },

    { path: '', component: AdminComponent, canActivate: [AuthGuard], children: [

        { path: RoutesConfig.adminUsers, component: UsersPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminAdministrators, component: AdministratorsPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminLotteries, component: LotteriesPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminQuizzes, component: QuizzesPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminSpecialQuizzes, component: SpecialQuizzesPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminGames, component: GamesPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminOrders, component: OrdersPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminPresents, component: PresentsPageComponent, canActivate: [AuthGuard] },

        { path: RoutesConfig.adminSettings, component: SettingsPageComponent, canActivate: [AuthGuard] },
        ]
    },

    { path: '**', redirectTo: RoutesConfig.login, pathMatch: 'full' }
];
