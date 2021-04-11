import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public productForm: FormGroup;

  public loadingText = ``;

  allCategories = [];
  weekDays = [6,7];

  image: any;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.renderForm();
  }

  //// initializing form
  renderForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      designation: ['', [Validators.required]],
      shortDescription: ['', [Validators.required ]],
      description: [''],
      productPrice: ['', [Validators.required]],
      purchasingPrice: ['', [Validators.required]],
      label: [``],
      articleNo: [``],
      vatRate: [16],
      orderForm: [``],
      sortCapture: [``],
      categoryId: [``, Validators.required],
      isActive: [true],
      isTrailAvailable: [true],
      isHideOnSupplierOrder: [false],
      viewArticle: [false],
      isGraded: [false],
    });
  }

  getCategories() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    this.settingService.getAllCategories()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allCategories = response.data;
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

  onFileAttach(file) {
    if (file && file.length) {
      const fileObj = file[0];
      if (fileObj.type !== 'application/pdf') {
        const reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = (_event) => {
          fileObj.src = reader.result;
        };
        this.image = fileObj;
      }
    }
  }

  onAddWeekDays(checked, day) {
    if (checked) {
      if (day === `Saturday`) {
        this.weekDays.push(6);
      } else if (day === `Sunday`) {
        this.weekDays.push(7);
      } else if (day === `WorkingDays`) {
        this.weekDays = this.weekDays.concat([1,2,3,4,5]);
      }
    } else {
      let ids = [];
      if (day === `Saturday`) {
        ids.push(6);
      } else if (day === `Sunday`) {
        ids.push(7);
      } else if (day === `WorkingDays`) {
        ids = ids.concat([1,2,3,4,5]);
      }

      // tslint:disable-next-line: prefer-for-of
      for(let i = 0; i < ids.length; i++) {
        const index = this.weekDays.findIndex(x => x === ids[i]);
        if (index > -1) {
          this.weekDays.splice(index, 1);
        }
      }
    }
  }

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.spinner.hide();
      this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
      return;
    } else if (this.weekDays.length < 1){
      this.helperService.alertFailure(`Please Select At least one day`, `Invalid`);
      this.spinner.hide();
    } else if (!this.image || !this.image.src) {
      this.helperService.alertFailure(`Please Select Image of product`, `Invalid`);
      this.spinner.hide();
    } else {
      this._submit();
    }
  }

  _submit() {
    const userId = AuthService.getLoggedUser().data.id;

    const formData = new FormData();

    // to append form Data
    const productFormData = this.productForm.value
    for (const key in productFormData) {
      if (productFormData.hasOwnProperty(key)) {
        formData.append(key, productFormData[key]);
      }
    }

    formData.append('weekDaysId', JSON.stringify(this.weekDays));
    formData.append('userId', userId);
    formData.append('image', this.image, this.image['name']);


    // const formData = this.productForm.value;
    // formData.weekDaysId = this.weekDays;
    // formData.userId = userId;

    this.settingService.addProduct(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.helperService.navigate(`settings/active-products`);
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
  get cf() {
    return this.productForm.controls;
  }

  ///////// ************ validation of form *********** ///////////
  // tslint:disable-next-line: typedef
  descriptionError() {
    return this.cf.shortDescription.hasError('required') ? 'shortDescription is required':
      '';
  }

  // tslint:disable-next-line: typedef
  designationError() {
    return this.cf.designation.hasError('required') ? 'designation is required' :
        '';
  }

  // tslint:disable-next-line: typedef
  productPriceError() {
    return this.cf.productPrice.hasError('required') ? 'productPrice is required' :
        '';
  }

  // tslint:disable-next-line: typedef
  purchasingPriceError() {
    return this.cf.purchasingPrice.hasError('required') ? 'purchasingPrice is required' :
        '';
  }

  // tslint:disable-next-line: typedef
  nameError() {
    return this.cf.name.hasError('required') ? 'Name is required' :
        '';
  }

  // tslint:disable-next-line: typedef
  categoryError() {
    return this.cf.categoryId.hasError('required') ? 'Please select its category' :
        '';
  }

}
