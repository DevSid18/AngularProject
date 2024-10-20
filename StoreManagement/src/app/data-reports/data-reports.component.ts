// import { Component, Input, OnInit, ViewChild, input, output, viewChild } from '@angular/core';
// import { CustInformation } from '../StoreEntity/CustInformation';
// import { CommonModule } from '@angular/common';
// import { CustomerService } from '../customer-manage/customer.service';
// import { Router } from '@angular/router';
// import { CustomerManageComponent } from '../customer-manage/customer-manage.component';


// @Component({
//   selector: 'app-data-reports',
//   standalone: true,
//   imports: [CommonModule, CustomerManageComponent],
//   templateUrl: './data-reports.component.html',
//   styleUrl: './data-reports.component.css'
// })
// export class DataReportsComponent implements OnInit {

//   @Input() customerInfo: CustInformation[] = [];
//   customerInfos: CustInformation[] = [];
//   CustInfo!: CustInformation;
//   @ViewChild(CustomerManageComponent) customerManageComponent!: CustomerManageComponent;

//   constructor(private customerService: CustomerService, private router: Router) { }
//   ngOnInit(): void {
//     this.CustomerDetails();
//   }
//   CustomerDetails() {
//     this.customerService.GetAllCustomers().subscribe(data => {
//       this.customerInfos = data;
//     })
//   }
//   GetUserInfo(id: number) {
//     this.customerService.GetCustomerInfo(id).subscribe(userInfo => {
//       this.CustInfo = userInfo;
//       if (this.customerManageComponent) {
//         this.customerManageComponent.updateForm(this.CustInfo);
//         this.customerManageComponent.Cust = this.CustInfo;
//       };
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CustInformation } from '../StoreEntity/CustInformation';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer-manage/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-reports.component.html',
  styleUrls: ['./data-reports.component.css']
})
export class DataReportsComponent implements OnInit {

  customerInfos: CustInformation[] = [];

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.CustomerDetails();
  }

  CustomerDetails() {
    this.customerService.GetAllCustomers().subscribe(data => {
      this.customerInfos = data;
    });
  }

  GetUserInfo(id: number, action?: string) {
    this.customerService.GetCustomerInfo(id).subscribe(userInfo => {
      this.router.navigate(['/customer-manage'], {
        queryParams: {
          id: userInfo.customerId,
          firstName: userInfo.firstName,
          middleName: userInfo.middleName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          contact: userInfo.contact,
          phyAddress: userInfo.phyAddress,
          action: action,
        }
      });
    });
  }
}


