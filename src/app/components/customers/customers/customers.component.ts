import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FranchiseService } from '../../franchises/franchise.service';
import { TourService } from '../../tours/tour.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  active = 1;

  public customerForm: FormGroup;

  public customerId;

  public loadingText = ``;
  public allTours = [];
  public allFranchises = [];

  public orders = [];
  public orderInterruption = [];
  public orderDetails: any = {};
  public trailOrders = [];
  public additionalOrders = [];
  public orderInterruptions = [];

  public changePassword;
  public isArchived = false;

  public invoiceHistory = [];

  productName;

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private customerService: CustomersService,
    private tourService: TourService,
    private franchiseService: FranchiseService,
    private route: ActivatedRoute
  ) {
    this.getALlTours();
    this.getAllFranchises();
    this.renderForm();

    this.route.params.subscribe(params => {
      if (params.id) {
        this.customerId = params[`id`];
      }
    })
  }

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = {
      id: this.customerId
    };

    this.customerService.getCustomerData(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.isArchived = response.data.isArchive;
          this.populateForm(response.data);
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

  populateForm(data) {
    if (data) {
      this.customerForm.patchValue({
        fName: data.fName,
        lName: data.lName,
        salutation: data.salutation,
        academicTitle: data.academicTitle,
        email: data.email,
        phone: data.phone,
        postalCode: data.postalCode,
        town: data.town,
        houseStreetNumber: data.houseStreetNumber,
        deliverNotes: data.deliverNotes,
        company: data.company,
        companyFName: data.companyFName,
        companyLName: data.companyLName,
        companyPostal: data.companyPostal,
        companyPlace: data.companyPlace,
        companyHouseStreetNumber: data.companyHouseStreetNumber,
        fax: data.fax,
        telePhone: data.telePhone,
        telePhone2: data.telePhone2,
        bankAccountOwner: data.bankAccountOwner,
        iban: data.iban,
        code: data.code,
        tourWeekDays: data.tourWeekDays,
        tourSaturday: data.tourSaturday,
        tourSunday: data.tourSunday,
        sortingWeekDays: data.sortingWeekDays,
        sortingSaturday: data.sortingSaturday,
        sortingSunday: data.sortingSunday,
        discountHeight: data.discountHeight,
        discountReason: data.discountReason,
        isDifferentDeliveryFee: data.isDifferentDeliveryFee,
        feeWorkingDays: data.feeWorkingDays,
        feeSaturday: data.feeSaturday,
        feeSunday: data.feeSunday,
        paymentType: data.paymentType,
        sendInvoiceByEmail: data.sendInvoiceByEmail,
        isDiscountActivated: data.isDiscountActivated,
        partnerId: data.partnerId,
        isActive: data.isActive,
      })
    }
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
      postalCode: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]],
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
      paymentType: [``],
      sendInvoiceByEmail: [false],
      isDiscountActivated: [false],
      partnerId: [''],
      isTrail: [false],
      isActive: [true],
      isWeb: [false]
    });
  }

  updateCustomer() {
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
      (this.customerForm.value.bankAccountOwner === `` || !this.customerForm.value.bankAccountOwner) ) {
        this.helperService.alertFailure(`Please Enter account details`, `Invalid`);
        this.spinner.hide();
      } else {
        this._submit();
      }
    }
  }

  _submit() {
    const formData = this.customerForm.value;
    this.customerService.updateCustomer(formData, this.customerId)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          // this.helperService.navigate(`customers/login`);
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

  selectedTab(tab) {
    if (tab === `orders`) {
      this.orderDetails = {};
      this.getOrders();
      this.getInterruption();
    } else if (tab === `trail`) {
      this.orderDetails = {};
      this.getTrailOrders();
    } else if (tab === `additional`) {
      this.orderDetails = {};
      this.getAdditionalOrders();
    } else if (tab === `documents`) {
      this.orderDetails = {};
      this.getAllInvoices();
    }
  }

  getAllInvoices() {
    this.spinner.show();
    const data = {
      CustomerId: this.customerId
    };

    this.customerService.getInvoices(data)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.invoiceHistory = response.data;
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getPDF(invoice): void {
    this.spinner.show();
    const data = {
      id: invoice.id
    };

    this.customerService.getInvoicePDF(data)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  maintainOrderDetail(order) {
    if (order) {
      const data = [];
      let name = ``;
      for (const detail of order.OrderDetail) {
        // console.log(detail);
        name = detail.product;

        const index = data.findIndex( x => x.product === name);

        if (index > -1) {
          const dayObj = {
            quantity: detail.quantity,
            day: detail.OrderDay.day
          };
          data[index].detail.push(dayObj);
        } else {
          const obj = {
            product: detail.product,
            price: detail.price,
            detail: []
          };
          const dayObj = {
            quantity: detail.quantity,
            day: detail.OrderDay.day
          };
          obj.detail.push(dayObj);
          data.push(obj);
        }
      }

      this.orderDetails.details = data;
    }
  }

  maintainAdditionalOrderDetail(order) {
    if (order) {
      const data = [];
      let name = ``;
      for (const detail of order.AdditionalOrderDetail) {
        // console.log(detail);
        name = detail.product;

        const index = data.findIndex( x => x.product === name);

        if (index > -1) {
          const dayObj = {
            quantity: detail.quantity,
            day: detail.OrderDay.day
          };
          data[index].detail.push(dayObj);
        } else {
          const obj = {
            product: detail.product,
            price: detail.price,
            detail: []
          };
          const dayObj = {
            quantity: detail.quantity,
            day: detail.OrderDay.day
          };
          obj.detail.push(dayObj);
          data.push(obj);
        }
      }

      this.orderDetails.details = data;
    }
  }

  checkQuantity(product, day) {
    const found = product.detail.find(x => x.day === day);
    if (found) {
      return found.quantity
    } else {
      return null
    }
  }

  getOrders() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      CustomerId: this.customerId,
      isTrail: false
    }

    this.customerService.getCustomerOrder(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.orders = response.data;
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

  getInterruption() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      CustomerId: this.customerId,
    }

    this.customerService.getOrderInterruption(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.orderInterruption = response.data;
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

  getTrailOrders() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      CustomerId: this.customerId,
      isTrail: true
    }

    this.customerService.getCustomerOrder(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.trailOrders = response.data;
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

  getAdditionalOrders() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      CustomerId: this.customerId
    }

    this.customerService.getAdditionalOrder(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.additionalOrders = response.data;
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

  selectedOrder(order) {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      id: order.id
    }

    this.customerService.getOrderDetail(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.orderDetails = response.data;
          this.maintainOrderDetail(response.data);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      })
  }

  selectedAdditionalOrder(order) {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();
    const data = {
      id: order.id
    }

    this.customerService.getAdditionalDetail(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.orderDetails = response.data;
          this.maintainAdditionalOrderDetail(response.data);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      })
  }

  setPassword() {
    this.spinner.show();
    if (!this.changePassword || this.changePassword === ``) {
      this.helperService.alertFailure(`Please enter password `, `Invalid`);
      this.spinner.hide();
    } else {
      this._setPassword();
    }
  }

  _setPassword() {
    const data = {
      id: this.customerId,
      password: this.changePassword
    }
    this.customerService.setPassword(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.changePassword = ``;
          // this.helperService.navigate(`customers/login`);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      })
  }

  deleteCustomer() {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This Customer will be Permanently deleted, you can also archive customer`,
      title: `Caution!`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait...`;
          this.spinner.show();
          this.customerService.deleteCustomer(this.customerId)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.helperService.navigate(`/customers/search-customers`);
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
      });
  }

  moveToArchive() {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This Customer will be moved to archive`,
      title: `Alert!`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Moving Customer, please wait...`;
          this.spinner.show();
          const data = {
            isArchive: true,
            isTrail: false
          }

          this.customerService.updateCustomer(data, this.customerId)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                // this.helperService.navigate(`/customers/search-customers`);
                this.getCustomerData();
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
    return this.cf.postalCode.hasError('minlength') ? 'Please Enter Valid Postal Code' :
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
    return this.cf.partnerId.hasError('required') ? 'Please select partner' :
      '';
  }

}
