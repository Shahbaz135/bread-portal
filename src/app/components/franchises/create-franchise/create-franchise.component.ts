import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FranchiseService } from '../franchise.service';

@Component({
  selector: 'app-create-franchise',
  templateUrl: './create-franchise.component.html',
  styleUrls: ['./create-franchise.component.scss']
})
export class CreateFranchiseComponent implements OnInit {
  public franchiseForm: FormGroup;

  public loadingText = ``;
  image: any;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private partnerService: FranchiseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.renderForm();
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
      iban: [``],
      isName: [false],
      isHouseStreetNumber: [false],
      isPostalCode: [false],
      isTown: [false],
      isEmail: [false],
      isPassword: [false],
      isIban: [false],
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
    if (this.image) {
      formData.append('picture', this.image, this.image['name']);
    }

    this.partnerService.create(formData)
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
