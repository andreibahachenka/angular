import { LoginPageComponent } from './page/login-page.component';
import { RouterModule, Routes } from '@angular/router';

export const routes = [
    { path: 'login', component: LoginPageComponent }
];

export const LoginPageRoutes = RouterModule.forChild(routes);
