import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustInformation } from '../StoreEntity/CustInformation';
import { CommonModule } from '@angular/common';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../CommonServices/common.service';
import { LocationService } from '../CommonServices/location.service';

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
  selectedTeam?: string;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  stateCode?: string;


  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
    private router: Router, private route: ActivatedRoute, private comServ: CommonService,
    private locationService: LocationService,) {
    this.CustomerForm = this.formBuilder.group({
      customerId: [0],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contact: ['', Validators.required],
      phyAddress: ['', Validators.required],
      action: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const customer: CustInformation = {
        customerId: +params['id'] || 0,
        firstName: params['firstName'] || '',
        middleName: params['middleName'] || '',
        lastName: params['lastName'] || '',
        email: params['email'] || '',
        contact: params['contact'] || '',
        phyAddress: params['phyAddress'] || '',
        action: params['action'] || '',
        country: params['country'] || '',
        state: params['state'] || '',
        district: params['district'] || '',
        gender: params['gender'] || ''
      };
      this.updateForm(customer);

      switch (customer.action?.toLocaleLowerCase()) {
        case '':
          this.bodyCss = 'regBodyCss';
          break;
        case 'edit':
          this.bodyCss = 'upgdBodyCss';
          break;
        case 'delete':
          this.bodyCss = 'delBodyCss';
          break;
        case 'view':
          this.bodyCss = 'viewBodyCss';
          break;
      }
      // this.getGeolocation();
    });
    this.locationService.getCountries().subscribe(data => {
      this.countries = data.geonames;
    });
    this.CustomerForm.get('country')?.valueChanges.subscribe(countryCode => {
      this.fetchStates(countryCode);
    });
    this.CustomerForm.get('state')?.valueChanges.subscribe(stateCode => {
      this.fetchCities(stateCode);
    });
  }

  fetchStates(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    if (selectedValue) {
      const [countryId, countryName] = selectedValue.split(',');
      this.locationService.getStates(countryId).subscribe(
        (data) => {
          this.states = data.geonames || [];
          this.cities = [];
          this.CustomerForm.patchValue({ city: '' });
        },
        (error) => {
          console.error('Error fetching states:', error);
        }
      );
    } else {
      this.states = [];
      this.cities = [];
    }
  }

  fetchCities(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue) {
      const [stateCode, countryCode] = selectedValue.split(',');
      if (stateCode && countryCode) {
        this.locationService.getCities(stateCode, countryCode).subscribe(
          (data) => {
            console.log('Cities fetched:', data);  // Log cities response
            this.cities = data.geonames || [];  // Assign the cities
          },
          (error) => {
            console.error('Error fetching cities:', error);
          }
        );
      } else {
        this.cities = [];
      }
    }
  }

  // getGeolocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;

  //       fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9c52f2c1dd654c1abec5318f0822a4fd`)
  //         .then(response => response.json())
  //         .then(data => {
  //           const country = data.results[0]?.components.country;
  //           const state = data.results[0]?.components.state;
  //           const district = data.results[0]?.components.state_district;
  //           const stateCode = data.results[0]?.components.state_code || data.results[0]?.components.postcode;

  //           this.CustomerForm.patchValue({
  //             country: country || '',
  //             state: state || '',
  //             district: district || ''
  //           });
  //         })
  //         .catch(error => console.log('Error:', error));
  //     }, (error) => {
  //       console.log('Geolocation Error:', error);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // }

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
      country: this.CustomerForm.get('country')?.value.split(',')[1],
      state: this.CustomerForm.get('state')?.value,
      district: this.CustomerForm.get('district')?.value,
      gender: this.CustomerForm.get('gender')?.value,
    };
    if (this.isValid(Customer)) {
      this.comServ.ToastMessage(true, this.error, 'error', 'Validation').then(() => {
        return;
      });
    }
    if (Customer.customerId == 0 && this.header?.trim().toLocaleLowerCase() == 'register') {
      this.header = "register";
      Customer.action = "register";
      this.bodyCss = "regBodyCss"
    }
    else if (Customer.customerId > 0 && !this.header) {
      Customer.action = this.header;
    }
    this.customerService.CustomerActions(Customer).subscribe((data) => {
      if (data[0]?.result?.toUpperCase() === 'SUCCESS') {
        this.comServ.ToastMessage(true, "Your information submitted successfully..!", 'success')
          .then(() => {
            this.RemoveInformation('SUCCESS');
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
      this.comServ.ToastMessage(true, "No userInfo received", 'error', 'Oops..!').then(() => {
        return;
      });
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
      action: userInfo.action,
      country: userInfo.country,
      state: userInfo.state,
      district: userInfo.district,
      gender: userInfo.gender
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
      phyAddress: '',
      state: 0,
      district: 0,
      gender: ''
    });
    if (action?.toUpperCase() === 'SUCCESS')
      this.router.navigate(['/login']);
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
  onSelected(value: string): void {
    this.selectedTeam = value;
  }
}
