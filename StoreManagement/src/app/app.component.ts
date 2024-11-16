import { Component, RendererFactory2, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CustomerManageComponent } from "./customer-manage/customer-manage.component";
import { DataReportsComponent } from "./data-reports/data-reports.component";
import { WelcomepageComponent } from "./welcomepage/welcomepage.component";
import { CommonviewComponent } from './CommonFolder/commonview/commonview.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from './CommonServices/common.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CustomerManageComponent,
    DataReportsComponent,
    WelcomepageComponent,
    RouterModule,
    CommonviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    BsModalService,  // Ensure BsModalService is provided here
  ]
})
export class AppComponent {
  title = 'StoreManagement';
  constructor(private router: Router) { }

  @ViewChild('dynamicTemplate') tempRef!: TemplateRef<any>;

  // OpenPage(page: string) {
  //   switch (page.toLowerCase()) {
  //     case 'home':
  //       this.router.navigate(['/welcomepage']);
  //       break;
  //     case 'addcustomer':
  //       this.router.navigate(['/customer-manage']);
  //       break;
  //     case 'showcustomers':
  //       this.router.navigate(['/data-reports']);
  //       break;
  //   }
  // }
  OpenPage(page: string) {
    const lowerCasePage = page.toLowerCase();
    const routes: { [key: string]: string } = {
      'home': '/welcomepage',
      'addcustomer': '/customer-manage',
      'showcustomers': '/data-reports',
      'common': 'commonview'
    };
    const route = routes[lowerCasePage];
    if (route) {
      this.router.navigate([route]);
      console.log(`${lowerCasePage} hit`);
    } else {
      alert('Invalid page: ');
    }
  }

}
