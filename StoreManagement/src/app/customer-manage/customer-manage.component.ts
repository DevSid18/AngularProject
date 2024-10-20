import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustInformation } from '../StoreEntity/CustInformation';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../CommonServices/common.service';



@Component({
  selector: 'app-customer-manage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.css']
})
export class CustomerManageComponent implements OnInit {
  CustomerForm!: FormGroup;
  error!: string;
  saveBtn: boolean = true;
  updateBtn: boolean = false;
  afterupdate: boolean = false;
  header?: string;
  pageAction?: string;
  bodyCss?: string;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
    private router: Router, private route: ActivatedRoute, private comServ: CommonService) {
    this.CustomerForm = this.formBuilder.group({
      customerId: [0],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact: ['', Validators.required],
      phyAddress: ['', Validators.required],
      action: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Get query parameters from the route
    this.route.queryParams.subscribe(params => {
      const customer: CustInformation = {
        customerId: +params['id'] || 0,
        firstName: params['firstName'] || '',
        middleName: params['middleName'] || '',
        lastName: params['lastName'] || '',
        email: params['email'] || '',
        contact: params['contact'] || '',
        phyAddress: params['phyAddress'] || '',
        action: params['action'] || ''
      };
      this.updateForm(customer);

      switch (customer.action?.toLocaleLowerCase()) {
        case '':
          this.bodyCss = 'regBodyCss'
          break;
        case 'edit':
          this.bodyCss = 'upgdBodyCss'
          break;
          case 'delete':
          this.bodyCss = 'delBodyCss'
          break;
          case 'view':
            this.bodyCss = 'viewBodyCss'
            break;
      }
    });
  }

  CustomerAction() {
    const Customer: CustInformation = {
      customerId: this.CustomerForm.get('customerId')?.value,
      firstName: this.CustomerForm.get('firstName')?.value,
      middleName: this.CustomerForm.get('middleName')?.value,
      lastName: this.CustomerForm.get('lastName')?.value,
      email: this.CustomerForm.get('email')?.value,
      contact: this.CustomerForm.get('contact')?.value,
      phyAddress: this.CustomerForm.get('phyAddress')?.value,
      action: this.CustomerForm.get('action')?.value,
    };
    if (this.isValid(Customer)) {
      alert(this.error);
      return;
    }
    if (Customer.customerId == 0 && this.header?.trim().toLocaleLowerCase() == 'register') {
      this.header = "register";
      Customer.action = "register";
      this.bodyCss = "regBodyCss"
    }
    else if (Customer.customerId > 0 && !this.header) {
      Customer.action = this.header;
    }
    this.customerService.AddCustomer(Customer).subscribe((data) => {
      if (data.toLowerCase() == 'success') {
        this.comServ.ToastMessage(true, "Your information submitted successfully..!", 'success')
          .then(() => {
            this.RemoveInformation('success');
          }).catch((error) => {
            console.error('Toast message failed:', error);
          });
      }
      else {
        this.comServ.ToastMessage(true, "Once again enter your information", 'error').then(() => {
          this.RemoveInformation('error');
        });
      }
    });
  }

  updateForm(userInfo: CustInformation) {
    if (!userInfo) {
      console.error('No userInfo received');
      return;
    }
    if (userInfo.customerId == 0)
      this.header = 'register';
    else
      this.header = userInfo.action;
    this.CustomerForm.setValue({
      customerId: userInfo.customerId || 0,
      firstName: userInfo.firstName || '',
      middleName: userInfo.middleName || '',
      lastName: userInfo.lastName || '',
      email: userInfo.email || '',
      contact: userInfo.contact || '',
      phyAddress: userInfo.phyAddress || '',
      action: userInfo.action
    });
  }

  RemoveInformation(action?: string) {
    this.CustomerForm.reset({
      customerId: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      contact: '',
      phyAddress: ''
    });
    if (action?.toLowerCase() == 'success')
      this.router.navigate(['/data-reports']);
    else
      this.router.navigate(['/customer-manage'])
  }

  isValid(customerValid: CustInformation): string {
    this.error = '';
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!customerValid.firstName || customerValid.firstName!.trim() === '') {
      this.error = 'Please enter first name';
    }
    else if (!customerValid.middleName || customerValid.middleName!.trim() === '') {
      this.error = 'Please enter middle name';
    }
    else if (!customerValid.lastName || customerValid.lastName!.trim() === '') {
      this.error = 'Please enter last name';
    }
    else if (!customerValid.email || !emailRegex.test(String(customerValid.email).toLowerCase())) {
      this.error = 'Please enter email in correct form';
    }
    else if (!customerValid.contact || customerValid.contact!.trim() === '') {
      this.error = 'Please enter contact';
    }
    else if (!customerValid.phyAddress || customerValid.phyAddress!.trim() === '') {
      this.error = 'Please enter physical address';
    }
    return this.error;
  }
}