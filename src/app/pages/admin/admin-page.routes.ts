import { AdminPageComponent } from './page/admin-page.component';
import { RouterModule, Routes } from '@angular/router';

export const routes = [
    { path: 'admin', component: AdminPageComponent }
];

export const AdminPageRoutes = RouterModule.forChild(routes);
