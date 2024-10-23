import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CustomerManageComponent } from "./customer-manage/customer-manage.component";
import { DataReportsComponent } from "./data-reports/data-reports.component";
import { WelcomepageComponent } from "./welcomepage/welcomepage.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerManageComponent, DataReportsComponent,
    WelcomepageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StoreManagement';
  constructor(private router: Router) { }

  OpenPage(page: string) {
    switch (page.toLowerCase()) {
      case 'home':
        this.router.navigate(['/welcomepage']);
        break;
      case 'addcustomer':
        this.router.navigate(['/customer-manage']);
        break;
      case 'showcustomers':
        this.router.navigate(['/data-reports']);
        break;
      case 'commonview':
        this.router.navigate(['/commonview']);
        console.log('commonview hit');
        break;
    }
  }
}
