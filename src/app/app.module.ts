import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MaterialSharedModule } from "./core/material-shared.module";
import { NgSelectModule } from '@ng-select/ng-select';

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
    ChatsPageComponent,
    SettingsPageComponent,
    ReportsPageComponent,
    LogsPageComponent
} from './pages';

//COMPONENTS
import {
    LoginComponent,
    AdministratorsTableComponent,
    QuizzesTableComponent,
    UsersTableComponent,
    HeaderComponent,
    NavMenuComponent,
    ModalWindowComponent,
    LotteriesTableComponent,
    GamesTableComponent,
    OrdersTableComponent,
    AdminComponent,
    PresentsTableComponent,
    ReportsTableComponent,
    LogsTableComponent
} from './components';

//GLOBAL SERVICES
import {
    RestApiService,
    NavMenuService,
    NotificationService,
    FileUploadService,
    GettingCityService,
    UtilsService
} from './services';

//LOCAL SERVICES
import { UsersPageService } from './pages/users/page/services/users-page.service';
import { AdministratorsPageService } from './pages/administrators/page/services/administrators-page.service';
import { LoginService } from './components/login/services/login.service';
import { ModalWindowService } from './components/modal-window/services/modal-window.service';
import { LotteriesPageService } from './pages/lotteries/page/services/lotteries-page.service';
import { QuizzesPageService } from './pages/quizzes/page/services/quizzes-page.service';
import { SpecialQuizzesPageService } from './pages/special-quizzes/page/services/special-quizzes-page.service';
import { GamesPageService } from './pages/games/page/services/games-page.service';
import { OrdersPageService } from './pages/orders/page/services/orders-page.service';
import { PresentsPageService } from './pages/presents/page/services/presents-page.service';
import { SettingsPageService } from './pages/settings/page/services/settings-page.service';
import { ReportsPageService } from './pages/reports/page/services/reports-page.service';
import { ChatsPageService } from './pages/chats/page/services/chats-page.service';
import { LogsPageService } from './pages/logs/page/services/logs-page.service';

//styles
import '../styles/styles.scss';
import '../styles/table.scss';

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
      QuizzesPageComponent,
      QuizzesTableComponent,
      UsersTableComponent,
      HeaderComponent,
      NavMenuComponent,
      ModalWindowComponent,
      LotteriesTableComponent,
      AdminComponent,
      SpecialQuizzesPageComponent,
      GamesPageComponent,
      GamesTableComponent,
      OrdersPageComponent,
      OrdersTableComponent,
      PresentsPageComponent,
      PresentsTableComponent,
      SettingsPageComponent,
      ChatsPageComponent,
      SettingsPageComponent,
      ReportsTableComponent,
      ReportsPageComponent,
      LogsPageComponent,
      LogsTableComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      NgSelectModule,
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
      UtilsService,
      NotificationService,
      NavMenuService,
      UsersPageService,
      LoginService,
      QuizzesPageService,
      AdministratorsPageService,
      LotteriesPageService,
      ModalWindowService,
      FileUploadService,
      GettingCityService,
      GamesPageService,
      SpecialQuizzesPageService,
      OrdersPageService,
      PresentsPageService,
      SettingsPageService,
      ChatsPageService,
      LogsPageService,
      ReportsPageService,
      AuthGuard,
      environment.ENV_PROVIDERS,
      APP_PROVIDERS
  ]
})
export class AppModule {}
