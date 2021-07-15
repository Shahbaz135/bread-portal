import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WrapHttpService } from 'src/app/shared/services/common/wrap-http.service';
import { HttpConfig } from 'src/config/http-config';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  public readonly invoiceUrl = HttpConfig.getApiUrl() + '/invoice';

  constructor(public http: WrapHttpService) { }

  getInvoices(data?): Observable<any> {
    return this.http.get(this.invoiceUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  updateInvoiceStatus(data, id): Observable<any> {
    return this.http.put(this.invoiceUrl + `/update/` + id, data );
  }

  sendEmail(data): Observable<any> {
    return this.http.post(this.invoiceUrl + `/sendEmail`, data );
  }

  getInvoicesForBilling(data?) {
    return this.http.get(this.invoiceUrl + `/billing` + WrapHttpService.objToQuery(data));
  }

  /// for xml
  generateXML(data) {
    // return this.http.get(this.invoiceUrl + `/xml`, data);
    window.open(this.invoiceUrl + `/xml` + WrapHttpService.objToQuery(data));
  }
}
