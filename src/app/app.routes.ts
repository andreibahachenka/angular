import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/page';
import { UsersPageComponent } from './pages/users/page';
import { LotteriesPageComponent } from './pages/lotteries/page';

import { AuthGuard } from './guards/auth.guard';

import { RoutesConfig } from './../app-config/routes.config'
import { AdministratorsPageComponent } from "./pages/administrators/page/administrators-page.component";

export const ROUTES: Routes = [
    { path: '', redirectTo: RoutesConfig.login, pathMatch: 'full' },

    { path: RoutesConfig.login, component: LoginPageComponent },

    { path: RoutesConfig.adminUrl, redirectTo: RoutesConfig.startAdminRoute, pathMatch: 'full'},

    { path: RoutesConfig.startAdminRoute, component: UsersPageComponent, canActivate: [AuthGuard] },

    { path: RoutesConfig.adminAdministrators, component: AdministratorsPageComponent, canActivate: [AuthGuard] },

    { path: RoutesConfig.adminLotteries, component: LotteriesPageComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: RoutesConfig.login, pathMatch: 'full' }
];
