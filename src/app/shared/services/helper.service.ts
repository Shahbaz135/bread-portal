import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  ConfirmationAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  constructor(
    private router: Router,
    private location: Location
  ) { }

  alertSuccess(message, title = "") {
    Swal.fire({
      title,
      text: message,
      icon: "success",
    });
  }

  alertFailure(message, title = "") {
    Swal.fire({
      title,
      text: message,
      icon: "error",
    });
  }

  navigate(url) {
    this.router.navigate([url]);
  }

  navigateBack() {
    this.location.back();
  }
}
