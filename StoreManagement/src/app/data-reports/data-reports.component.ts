import { Component, OnInit } from '@angular/core';
import { CustInformation } from '../StoreEntity/CustInformation';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer-manage/customer.service';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'app-data-reports',
  standalone: true,
  imports: [CommonModule,AgGridModule, AgGridAngular],
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

  rowData = this.customerInfos;
  colDefs: ColDef[] = [
    {
      headerName: "Customer Name",
      field: "firstName",
      width : 150
    },
    {
      headerName: "Email",
      field: "email",
      width : 100
    },
    {
      headerName: "Contact",
      field: "contact",
      width : 50
    },
    {
      headerName: "Address",
      field: "phyAddress"
    }
  ];
  gridOptions: GridOptions = {
    onGridReady: (params) => {
      params.api.sizeColumnsToFit();
    }
  };

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
        this.rowData = this.customerInfos;
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


