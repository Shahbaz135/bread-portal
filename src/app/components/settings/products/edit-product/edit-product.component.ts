import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { environment } from 'src/environments/environment';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public productForm: FormGroup;

  public loadingText = ``;

  allCategories = [];
  weekDays = [6,7];

  image: any;
  existingImage = false;

  productId;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.getCategories();
    this.renderForm();

    this.route.params.subscribe(params => {
      if (params[`id`]) {
        this.productId = params[`id`];
      }
    })
  }

  ngOnInit(): void {
    this.getProductData();
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

  getProductData() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    const data ={
      id: this.productId
    }

    this.settingService.getAllProduct(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          const res = response.data[0];
          this.setData(res);
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

  setData(data) {
    if (data) {
      this.productForm.patchValue({
        name: data.name,
        designation: data.designation,
        shortDescription: data.shortDescription,
        description: data.description,
        productPrice: data.productPrice,
        purchasingPrice: data.purchasingPrice,
        label: data.label,
        articleNo: data.articleNo,
        vatRate: data.vatRate,
        orderForm: data.orderForm,
        sortCapture: data.sortCapture,
        categoryId: data.CategoryId,
        isActive: data.isActive,
        isTrailAvailable: data.isTrailAvailable,
        isHideOnSupplierOrder: data.isHideOnSupplierOrder,
        viewArticle: data.viewArticle,
        isGraded: data.isGraded,
      })

      const dayIds = data.productWeekDays.map(x => x.id)
      this.weekDays = dayIds;
      this.existingImage = true;
      this.image = data.image
    }
  }

  checkWeekDays(ids) {
    return this.weekDays.filter(x => ids === x).length;
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
        this.existingImage = false;
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
    } else if ((!this.image || !this.image.src) && !this.existingImage) {
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
    if (!this.existingImage) {
      formData.append('image', this.image, this.image['name']);
    }


    // const formData = this.productForm.value;
    // formData.weekDaysId = this.weekDays;
    // formData.userId = userId;

    this.settingService.editProduct(formData, this.productId)
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

  absPath(file) {
    return environment.fileBaseUrl + file;
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
