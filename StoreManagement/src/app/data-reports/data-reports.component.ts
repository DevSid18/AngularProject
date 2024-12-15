import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import type { ColDef, GridOptions, ICellRendererParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { CustInformation } from "../StoreEntity/CustInformation";
import { CustomerService } from "../customer-manage/customer.service";
import { Router } from "@angular/router";

ModuleRegistry.registerModules([AllCommunityModule]);
interface MyGridOptions extends GridOptions {
  frameworkComponents: {
    actionCellRenderer: any;
  };
}
@Component({
  selector: 'app-data-reports',
  standalone: true,
  imports: [CommonModule, AgGridAngular, AgGridModule,],
  templateUrl: './data-reports.component.html',
  styleUrls: ['./data-reports.component.css']
})
export class DataReportsComponent implements OnInit {
  customerInfos: CustInformation[] = [];
  custId: number = 0;
  action?: string = "";
  isValidSend: boolean = false;
  private gridApi: any;
  private columnApi: any;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.CustomerDetails();

    const gridOptions: MyGridOptions = {
      onGridReady: (params) => {
        this.gridApi = params.api;
        // this.columnApi = params.columnApi;
      },
      frameworkComponents: {
        actionCellRenderer: this.actionCellRenderer.bind(this),
      },
    };
  }
  rowData = this.customerInfos;

  colDefs: ColDef[] = [
    { headerName: 'Customer Name', field: 'firstName', width: 150, checkboxSelection: true },
    { headerName: 'Email', field: 'email', width: 100 },
    { headerName: 'Contact', field: 'contact' },
    { headerName: 'Address', field: 'phyAddress' },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: 'actionCellRenderer',
      width: 120
    }
  ];

  gridOptions: GridOptions = {
    rowModelType: 'clientSide',
    theme: 'legacy', 
    onGridReady: (params) => {
      this.gridApi = params.api;
    },
  };

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    editable: true,
    sortable: true
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
            country: userInfo[0].country,
            state: userInfo[0].state,
            district: userInfo[0].district,
            gender: userInfo[0].gender
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

  onGridReady(event: any): void {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
    const obj = this.gridApi.getColumn;
  }
  actionCellRenderer(params: ICellRendererParams) {
    ``
    const button = document.createElement('button');
    button.innerHTML = 'Edit';
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click', () => this.onEditClick(params));
    return button;
  }
  onEditClick(params: ICellRendererParams) {
    const customerData = params.data;
    console.log('Edit customer:', customerData);

    if (customerData && customerData.customerId) {
      this.router.navigate(['/edit', customerData.customerId]);
    } else {
      console.error('Customer ID is missing');
    }
  }

}
