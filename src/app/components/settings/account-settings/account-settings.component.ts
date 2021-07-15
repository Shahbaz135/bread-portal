import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  public loadingText = ``;
  active = 1;

  userInfo: any = {};

  bankTransfer = {
    accountOwner: ``,
    bankName: ``,
    bankCode: ``,
    bankAccountNumber: ``,
    accountType: `Transfer`,
  };

  bankDTADebit = {
    accountOwner: ``,
    bankName: ``,
    bankCode: ``,
    bankAccountNumber: ``,
    accountType: `DTA debit`,
  };

  bankSEPADebit = {
    iban: ``,
    bic: ``,
    creditorId: ``,
    usage: ``,
    accountType: `Direct debit`,
  };

  userDetails = {
    fName: ``,
    lName: ``,
    postalCode: ``,
    town: ``,
    email: ``,
    houseStreetNumber: ``
  };

  bakeryInfo = {
    name: ``,
    postalCode: ``,
    town: ``,
    email: ``,
    houseStreetNumber: ``,
    phone: ``,
    fax: ``,
  };

  deliveryChargeInfo = {
    workingDays: ``,
    saturday: ``,
    sunday: ``,
  };

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
  ) {
    this.userInfo = AuthService.getLoggedUser().data;
    this.setPersonalData(this.userInfo);
  }

  ngOnInit(): void {
    this.getBankDetail();
  }

  onChange(current) {
    if (current === 1) {
      this.getBankDetail();
    }
    if (current === 2) {
      this.getDeliveryCharge();
      this.getBakery();
    }
  }

  // getDeliveryCharge() {
  //   this.loadingText = `Fetching details, please wait..`;
  //   this.spinner.show();

  //   const formData = {
  //     userId: this.userInfo.id
  //   }
  //   this.settingService.getCharges(formData)
  //     .subscribe((response) => {
  //       this.spinner.hide();
  //       if (response.status === `Success`) {
  //         this.setDeliveryChargeData(response.data);
  //       }
  //     }, (error) => {
  //       this.spinner.hide();
  //       console.log(error);
  //       if (error.error) {
  //         this.helperService.alertFailure(error.error.message[0].message, `Error`);
  //       } else {
  //         this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
  //       }
  //     });
  // }

  getDeliveryCharge() {
    this.loadingText = `Fetching details, please wait..`;
    this.spinner.show();

    const formData = {
      userId: this.userInfo.id
    }
    this.settingService.getCharges(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.setDeliveryChargeData(response.data);
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

  getBakery() {
    this.loadingText = `Fetching details, please wait..`;
    this.spinner.show();

    const formData = {
      userId: this.userInfo.id
    }
    this.settingService.getBakery(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.setBakeryData(response.data);
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

  getBankDetail() {
    this.loadingText = `Fetching details, please wait..`;
    this.spinner.show();

    const formData = {
      // userId: this.userInfo.id
    }
    this.settingService.getBankDetails()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          const sepaDebit = response.data.find(x => x.accountType == 'Direct debit');
          if (sepaDebit) {
            this.setSEPADebitData(sepaDebit);
          }
          
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

  setPersonalData(data) {
    if (data) {
      this.userDetails.fName = data.fName;
      this.userDetails.lName = data.lName;
      this.userDetails.postalCode = data.postalCode;
      this.userDetails.email = data.email;
      this.userDetails.town = data.town;
      this.userDetails.houseStreetNumber = data.houseStreetNumber;
    }
  }

  setBakeryData(data) {
    if (data) {
      this.bakeryInfo.name = data.name;
      this.bakeryInfo.postalCode = data.postalCode;
      this.bakeryInfo.email = data.email;
      this.bakeryInfo.town = data.town;
      this.bakeryInfo.houseStreetNumber = data.houseStreetNumber;
      this.bakeryInfo.phone = data.phone;
      this.bakeryInfo.fax = data.fax;
    }
  }

  setSEPADebitData(data) {
    if (data) {
      this.bankSEPADebit.iban = data.iban;
      this.bankSEPADebit.accountType = data.accountType;
      this.bankSEPADebit.bic = data.bic;
      this.bankSEPADebit.creditorId = data.creditorId;
      this.bankSEPADebit.usage = data.usage;
    }
  }

  setDeliveryChargeData(data) {
    if (data) {
      this.deliveryChargeInfo.workingDays = data.workingDays;
      this.deliveryChargeInfo.saturday = data.saturday;
      this.deliveryChargeInfo.sunday = data.sunday;
    }
  }

  baseDataSubmit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.userDetails.postalCode && this.userDetails.postalCode.length && this.userDetails.postalCode.length !== 5) {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Enter Valid Postal Code`, `Invalid`);
    } else if (this.bakeryInfo.postalCode && this.bakeryInfo.postalCode.length && this.bakeryInfo.postalCode.length !== 5) {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Enter Valid Bakery Postal Code`, `Invalid`);
    }
    else {
      this._userUpdate();
      this._updateBakery();
      this._updateDeliveryCharge();
    }
  }

  _userUpdate() {
    const formData: any = this.userDetails;
    this.settingService.updateUser(formData, this.userInfo.id)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          AuthService.setLoggedUser(response.data.tokenInfo, {});
          // this.helperService.alertSuccess(response.message, response.status);
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

  _updateBakery() {
    const formData: any = this.bakeryInfo;
    formData.userId = this.userInfo.id;
    this.settingService.updateBakery(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // this.helperService.alertSuccess(response.message, response.status);
          this.getBakery();
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

  _updateDeliveryCharge() {
    const formData: any = this.deliveryChargeInfo;
    formData.userId = this.userInfo.id;
    this.settingService.updateCharges(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.helperService.alertSuccess(response.message, response.status);
          this.getDeliveryCharge();
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

  bankDetailSubmit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.bankSEPADebit.iban) {
      if(this.bankSEPADebit.bic && this.bankSEPADebit.creditorId) {
        this._updateBankDetails()
      } else {
        this.spinner.hide();
        this.helperService.alertFailure(`Please Enter All required fields of SEAPA direct debit`, `Invalid`);
      }
    }
  }

  _updateBankDetails() {
    const formData: any = this.bankSEPADebit;
    this.settingService.updateBankDetails(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.helperService.alertSuccess(response.message, response.status);
          this.getBankDetail();
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

}
