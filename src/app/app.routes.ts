import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/page'
import { AdminPageComponent } from './pages/admin/page'

export const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'admin',  component: AdminPageComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
