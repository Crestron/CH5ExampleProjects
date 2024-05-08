import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: StartPageComponent },
    { path: 'main-page', component: MainPageComponent },
    { path: '*', component: StartPageComponent },
  ];