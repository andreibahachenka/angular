import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/page'
import { AdminPageComponent } from './pages/admin/page'

import { AuthGuard } from './guards/auth.guard';

import { RoutesConfig } from './../app-config/routes.config'

export const ROUTES: Routes = [
    { path: '', redirectTo: RoutesConfig.login, pathMatch: 'full' },

    { path: RoutesConfig.login, component: LoginPageComponent },

    { path: RoutesConfig.adminUrl, redirectTo: RoutesConfig.startAdminRoute, pathMatch: 'full'},

    { path: RoutesConfig.startAdminRoute, component: AdminPageComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: RoutesConfig.login, pathMatch: 'full' }
];
