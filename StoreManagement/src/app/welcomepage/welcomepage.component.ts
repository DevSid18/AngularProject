import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';



@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {
  constructor(private router: Router) { }

  OpenPage(page: string) {
    switch (page.toLowerCase()) {
      case 'customermanage':
        this.router.navigate(['/customer-manage']);
        break;
      case 'showcustomers':
        this.router.navigate(['/data-reports']);
        break;
    }
  }
}
