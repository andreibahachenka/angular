import { AdministratorsPageComponent } from './page/administrators-page.component';
import { RouterModule, Routes } from '@angular/router';

export const routes = [
    { path: 'admin/administrators', component: AdministratorsPageComponent }
];

export const AdministratorsPageRoutes = RouterModule.forChild(routes);
