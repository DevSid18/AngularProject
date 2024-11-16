import { Routes } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { CustomerManageComponent } from './customer-manage/customer-manage.component';
import { DataReportsComponent } from './data-reports/data-reports.component';
import { CommonviewComponent } from './CommonFolder/commonview/commonview.component';


export const routes: Routes = [
    { path: 'welcomepage', component: WelcomepageComponent },
    { path: 'customer-manage', component: CustomerManageComponent },
    { path: 'data-reports', component: DataReportsComponent },
    { path: 'commonview', component: CommonviewComponent },
    { path: '', redirectTo: '/data-reports', pathMatch: 'full' },
    { path: '**', redirectTo: '/data-reports' }
];
