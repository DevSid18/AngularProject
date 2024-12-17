import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule],
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

  OpenPage(page: string) {
    const lowerCasePage = page.toLowerCase();
    const routes: { [key: string]: string } = {
      'home': '/welcomepage',
      'addcustomer': '/customer-manage',
      'showcustomers': '/data-reports',
      'common': 'commonview',
      'login': 'login'

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
