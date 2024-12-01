import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonviewComponent } from "../CommonFolder/commonview/commonview.component";
import { CommonService } from '../CommonServices/common.service';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { BrowserModule } from '@angular/platform-browser';  // <-- Add this import
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [RouterModule, CommonviewComponent, CommonModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {
  constructor(private router: Router, private modalService: BsModalService) { }

  @ViewChild('dynamicTemplate') tempRef!: TemplateRef<any>;
  modalRef?: BsModalRef;

  OpenPage(page: string) {
    const lowerCasePage = page.toLowerCase();
    const routes: { [key: string]: string } = {
      'customermanage': '/customer-manage',
      'showcustomers': '/data-reports',
      'commonview': 'commonview'
    };
    const route = routes[lowerCasePage];
    if (route) {
      this.router.navigate([route]);
      console.log(`${lowerCasePage} hit`);
    } else {
      console.error('Invalid page: ', page);
    }
  }
  OpenModal() {
    this.modalRef = this.modalService.show(this.tempRef);
  }
}
