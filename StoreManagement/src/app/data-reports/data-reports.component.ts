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
  custId: number = 0;
  action?: string = "";
  isValidSend: boolean = false;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.CustomerDetails();
  }

  CustomerDetails() {
    const custInfo: CustInformation = {
      customerId: this.custId,
      action: this.action
    }
    if (!this.isValidSend) {
      custInfo.action = '';
    }
    if (custInfo.customerId == 0 && custInfo.action == '') {
      this.customerService.CustomerActions(custInfo).subscribe(data => {
        this.customerInfos = data;
      });
    }
    else {
      this.customerService.CustomerActions(custInfo).subscribe(userInfo => {
        this.router.navigate(['/customer-manage'], {
          queryParams: {
            id: userInfo[0].customerId,
            firstName: userInfo[0].firstName,
            middleName: userInfo[0].middleName,
            lastName: userInfo[0].lastName,
            email: userInfo[0].email,
            contact: userInfo[0].contact,
            phyAddress: userInfo[0].phyAddress,
            action: this.action,
          }
        });
      });
    }
  }
  GetUserInfo(id: number, action?: string) {
    this.custId = id,
      this.action = action;
    this.CustomerDetails();
  }
}


