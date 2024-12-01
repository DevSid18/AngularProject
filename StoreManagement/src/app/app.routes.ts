import { Routes } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { DataReportsComponent } from './data-reports/data-reports.component';
import { CommonviewComponent } from './CommonFolder/commonview/commonview.component';
import { UserloginComponent } from './User/Login/userlogin/userlogin.component';


export const routes: Routes = [
    { path: 'welcomepage', component: WelcomepageComponent },
    { path: 'customer-manage', component: CustomerManageComponent },
    { path: 'data-reports', component: DataReportsComponent },
    { path: 'commonview', component: CommonviewComponent },
    { path: 'login', component: UserloginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
