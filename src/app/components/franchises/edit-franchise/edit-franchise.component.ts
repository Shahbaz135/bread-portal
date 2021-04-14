import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { environment } from 'src/environments/environment';
import { FranchiseService } from '../franchise.service';


@Component({
  selector: 'app-edit-franchise',
  templateUrl: './edit-franchise.component.html',
  styleUrls: ['./edit-franchise.component.scss']
})
export class EditFranchiseComponent implements OnInit {
  public franchiseForm: FormGroup;

  public loadingText = ``;

  private franchiseId;

  image: any;
  existingImage = false;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private partnerService: FranchiseService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.renderForm();

    this.route.params.subscribe(params => {
      if (params[`id`]) {
        this.franchiseId = params[`id`];
      }
    })
  }

  ngOnInit(): void {
    if (this.franchiseId) {
      this.getData();
    }
  }

  getData() {
    this.spinner.show();
    this.loadingText = `Fetching record, Please wait...`;
    const data = { id : this.franchiseId};
    this.partnerService.getById(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.populateForm(response.data);
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

  populateForm(data) {
    if (data) {
      this.franchiseForm.controls[`name`].setValue(data.name);
      this.franchiseForm.controls[`email`].setValue(data.email);
      this.franchiseForm.controls[`town`].setValue(data.town);
      this.franchiseForm.controls[`houseStreetNumber`].setValue(data.houseStreetNumber);
      this.franchiseForm.controls[`postalCode`].setValue(data.postalCode);
      this.franchiseForm.controls[`password`].disable();
      this.franchiseForm.controls[`iban`].setValue(data.iban);
      this.franchiseForm.controls[`isName`].setValue(data.isName);
      this.franchiseForm.controls[`isHouseStreetNumber`].setValue(data.isHouseStreetNumber);
      this.franchiseForm.controls[`isPostalCode`].setValue(data.isPostalCode);
      this.franchiseForm.controls[`isEmail`].setValue(data.isEmail);
      this.franchiseForm.controls[`isPassword`].setValue(data.isPassword);
      this.franchiseForm.controls[`isIban`].setValue(data.isIban);
    }

    this.image = data.image;
    if (this.image) {
      this.existingImage = true;
    }
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

  //// initializing form
  renderForm(): void {
    this.franchiseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      houseStreetNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required ,Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]],
      town: [''],
      email: ['', [Validators.required , Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required]],
      iban: [''],
      isName: [false],
      isHouseStreetNumber: [false],
      isPostalCode: [false],
      isTown: [false],
      isEmail: [false],
      isPassword: [false],
      isIban: [false],
    });
  }

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.franchiseForm.invalid) {
      this.franchiseForm.markAllAsTouched();
      this.spinner.hide();
      this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
      return;
    } else {
      this._submit();
    }
  }

  _submit() {
    const userId = AuthService.getLoggedUser().data.id;

    const formData = new FormData();

    // to append form Data
    const productFormData = this.franchiseForm.value
    for (const key in productFormData) {
      if (productFormData.hasOwnProperty(key)) {
        formData.append(key, productFormData[key]);
      }
    }

    formData.append('userId', userId);
    if (this.image && !this.existingImage) {
      formData.append('picture', this.image, this.image['name']);
    }
    this.partnerService.update(formData, this.franchiseId)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          // this.franchiseForm.reset();
          this.helperService.navigate(`franchises/all-franchise`);
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
  get cf() {
    return this.franchiseForm.controls;
  }

  absPath(file) {
    return environment.fileBaseUrl + file;
  }

  ///////// ************ validation of form *********** ///////////
  // tslint:disable-next-line: typedef
  postalCodeError() {
    return this.cf.postalCode.hasError('required') ? 'Postal Code is required':
      this.cf.postalCode.hasError('minlength') ? 'Please Enter Valid Postal Code' :
        this.cf.postalCode.hasError('maxlength') ? 'Please Enter Valid Postal Code' :
          this.cf.postalCode.hasError('pattern') ? 'Please Enter Valid Postal Code' :
            '';
  }

  // tslint:disable-next-line: typedef
  nameError() {
    return this.cf.name.hasError('required') ? 'Name is required' :
      this.cf.name.hasError('minlength') ? 'Name contain at least 2 characters' :
        this.cf.name.hasError('maxlength') ? 'Name cannot exceed 100 characters' :
          '';
  }

  // tslint:disable-next-line: typedef
  houseStreetNumberError() {
    return this.cf.houseStreetNumber.hasError('required') ? 'Please enter house Street Number or Road name' :
      '';
  }

   // tslint:disable-next-line: typedef
  passwordError() {
    return this.cf.password.hasError('required') ? 'Password is required' :
      '';
  }

   // tslint:disable-next-line: typedef
  ibanError() {
    return this.cf.iban.hasError('required') ? 'IBAN is required' :
      '';
  }

   // tslint:disable-next-line: typedef
  emailError() {
  return this.cf.email.hasError('required') ? 'Email is required' :
    this.cf.email.hasError('email') ? 'Not a valid email.' :
      this.cf.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
        '';
  }

}
