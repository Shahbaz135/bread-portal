import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FranchiseService } from '../../franchises/franchise.service';
import { TourService } from '../../tours/tour.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.scss']
})
export class CreateCustomersComponent implements OnInit {
  public customerForm: FormGroup;

  public loadingText = ``;
  public allTours = [];
  public allFranchises = [];

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private customerService: CustomersService,
    private tourService: TourService,
    private franchiseService: FranchiseService
  ) { }

  ngOnInit(): void {
    this.getALlTours();
    this.getAllFranchises();
    this.renderForm();
  }

  getALlTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    this.tourService.getAll()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allTours = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getAllFranchises() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();

    this.franchiseService.getAll()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allFranchises = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  //// initializing form
  renderForm(): void {
    this.customerForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      salutation: [''],
      academicTitle: [''],
      email: ['', [Validators.required , Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]],
      town: ['', []],
      houseStreetNumber: ['', [Validators.required]],
      deliverNotes: [``],
      company: [``],
      companyFName: [``],
      companyLName: [``],
      companyPostal: [``,[Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]],
      companyPlace: [``],
      companyHouseStreetNumber: [``],
      fax: [``],
      telePhone: [``],
      telePhone2: [``],
      bankAccountOwner: [``],
      iban: [``],
      code: [``],
      tourWeekDays: [``],
      tourSaturday: [``],
      tourSunday: [``],
      sortingWeekDays: [``],
      sortingSaturday: [``],
      sortingSunday: [``],
      discountHeight: [``],
      discountReason: [``],
      isDifferentDeliveryFee: [false],
      feeWorkingDays: [``],
      feeSaturday: [``],
      feeSunday: [``],
      paymentType: [`direct-debit`],
      sendInvoiceByEmail: [false],
      isDiscountActivated: [false],
      partnerId: ['', Validators.required],
      isTrail: [false],
      isActive: [true],
      isWeb: [false]
    });
  }

  createCustomer() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.spinner.hide();
      this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
      return;
    } else {
      if (this.customerForm.value.tourWeekDays === `` && this.customerForm.value.tourSaturday === ``
        && this.customerForm.value.sortingSaturday === ``
      ) {
        this.helperService.alertFailure(`Please Assign a tour`, `Invalid`);
        this.spinner.hide();
      } else if (this.customerForm.value.paymentType === `direct-debit` &&
      (this.customerForm.value.bankAccountOwner === `` || this.customerForm.value.iban  === ``) ) {
        this.helperService.alertFailure(`Please Enter account details`, `Invalid`);
        this.spinner.hide();
      } else {
        this._submit();
      }
    }
  }

  _submit() {
    //// getting logged user
    const UserId = AuthService.getLoggedUser().data.id;
    const formData = this.customerForm.value;
    formData.UserId = UserId;
    this.customerService.createCustomer(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.customerForm.reset();
          // this.router.navigateByUrl(`auth/login`);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

   // convenience getter for easy access to registration form fields
  // tslint:disable-next-line: typedef
  get cf() {
    return this.customerForm.controls;
  }


  ///////// ************ validation of form *********** ///////////
  // tslint:disable-next-line: typedef
  postalCodeError() {
    return this.cf.postalCode.hasError('required') ? 'Post Code is required':
    this.cf.postalCode.hasError('minlength') ? 'Please Enter Valid Postal Code' :
      this.cf.postalCode.hasError('maxlength') ? 'Please Enter Valid Postal Code' :
        this.cf.postalCode.hasError('pattern') ? 'Please Enter Valid Postal Code' :
          '';
  }

  // tslint:disable-next-line: typedef
  companyPostalCodeError() {
    return this.cf.companyPostal.hasError('minlength') ? 'Please Enter Valid Postal Code' :
      this.cf.companyPostal.hasError('maxlength') ? 'Please Enter Valid Postal Code' :
        this.cf.companyPostal.hasError('pattern') ? 'Please Enter Valid Postal Code' :
          '';
  }

   // tslint:disable-next-line: typedef
  fNameError() {
    return this.cf.fName.hasError('required') ? 'First Name is required' :
      this.cf.fName.hasError('minlength') ? 'First Name contain at least 2 characters' :
        this.cf.fName.hasError('maxlength') ? 'First Name cannot exceed 100 characters' :
          '';
  }

  // tslint:disable-next-line: typedef
  lNameError() {
    return this.cf.lName.hasError('required') ? 'Last Name is required' :
      this.cf.lName.hasError('minlength') ? 'Name must contain at least 2 characters' :
        this.cf.lName.hasError('maxlength') ? 'Name cannot exceed 100 characters' :
          '';
  }

  // tslint:disable-next-line: typedef
  emailError() {
    return this.cf.email.hasError('required') ? 'Email is required' :
      this.cf.email.hasError('email') ? 'Not a valid email.' :
        this.cf.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
          '';
  }

  // tslint:disable-next-line: typedef
  phoneError() {
    return this.cf.phone.hasError('required') ? 'Mobile number is required' :
      this.cf.phone.hasError('maxlength') ? 'Length of Phone number must be 11' :
        this.cf.phone.hasError('minlength') ? 'Length of Phone number must be 11' :
            '';
  }

  // tslint:disable-next-line: typedef
  houseStreetNumberError() {
    return this.cf.houseStreetNumber.hasError('required') ? 'Please enter house Street Number or Road name' :
      '';
  }

   // tslint:disable-next-line: typedef
  partnerIdError() {
    return this.cf.partnerId.hasError('required') ? 'Please select Franchise' :
      '';
  }

}
