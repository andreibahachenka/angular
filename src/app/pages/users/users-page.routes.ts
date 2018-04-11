import { UsersPageComponent } from './page/users-page.component';
import { RouterModule, Routes } from '@angular/router';

export const routes = [
    { path: 'admin', component: UsersPageComponent }
];

export const UsersPageRoutes = RouterModule.forChild(routes);
