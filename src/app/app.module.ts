import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialSharedModule } from "./core/material-shared.module";

/*
 * Platform and Environment providers/directives/pipes
 */

import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AuthGuard } from './guards/auth.guard';

//PAGES
import { LoginPageComponent } from './pages/login/page';
import { UsersPageComponent } from './pages/users/page';
import { LotteriesPageComponent } from './pages/lotteries/page';
import { AdministratorsPageComponent } from './pages/administrators/page';

//COMPONENTS
import {
    LoginComponent,
    AdministratorsTableComponent,
    TableComponent,
    HeaderComponent,
    NavMenuComponent,
    ModalWindowComponent,
    LotteriesTableComponent
} from './components';

//GLOBAL SERVICES
import {
    RestApiService,
    NavMenuService,
    NotificationService
} from './services';

//LOCAL SERVICES
import { UsersPageService } from './pages/users/page/services/users-page.service';
import { AdministratorsPageService } from './pages/administrators/page/services/administrators-page.service';
import { LoginService } from './components/login/services/login.service';
import { ModalWindowService } from './components/modal-window/services/modal-window.service';
import { LotteriesPageService } from './pages/lotteries/page/services/lotteries-page.service';

//styles
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
      AppComponent,
      LoginPageComponent,
      LoginComponent,
      UsersPageComponent,
      LotteriesPageComponent,
      AdministratorsPageComponent,
      AdministratorsTableComponent,
      TableComponent,
      HeaderComponent,
      NavMenuComponent,
      ModalWindowComponent,
      LotteriesTableComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxDatatableModule,
      MaterialSharedModule,
      RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [] : [],
  ],

  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
      RestApiService,
      NotificationService,
      NavMenuService,
      UsersPageService,
      LoginService,
      AdministratorsPageService,
      LotteriesPageService,
      ModalWindowService,
      AuthGuard,
      environment.ENV_PROVIDERS,
      APP_PROVIDERS
  ]
})
export class AppModule {}
