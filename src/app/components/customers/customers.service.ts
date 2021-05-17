import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/customer';
  public readonly orderApiUrl = HttpConfig.getApiUrl() + '/order';
  public readonly interruptionApiUrl = HttpConfig.getApiUrl() + '/interruption';
  public readonly invoiceUrl = HttpConfig.getApiUrl() + '/invoice';

  constructor(public http: WrapHttpService) { }

  createCustomer(data): Observable<any> {
    return this.http.post(this.apiUrl + `/create`, data );
  }

  getAllCustomers(data?): Observable<any> {
    return this.http.get(this.apiUrl + `/getAll` + WrapHttpService.objToQuery(data));
  }

  getCustomerData(data?): Observable<any> {
    return this.http.get(this.apiUrl + `/getById` + WrapHttpService.objToQuery(data));
  }

  updateCustomer(data, id): Observable<any> {
    return this.http.put(this.apiUrl + `/update/` + id, data );
  }

  setPassword(data): Observable<any> {
    return this.http.post(this.apiUrl + `/changePassword`, data );
  }

  deleteCustomer(id): Observable<any> {
    return this.http.delete(this.apiUrl + `/delete/` + id );
  }

  getCustomerOrder(data?): Observable<any> {
    return this.http.get(this.orderApiUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  getAdditionalOrder(data?): Observable<any> {
    return this.http.get(this.orderApiUrl + `/addition/get` + WrapHttpService.objToQuery(data));
  }

  getAdditionalDetail(data?): Observable<any> {
    return this.http.get(this.orderApiUrl + `/addition/getById` + WrapHttpService.objToQuery(data));
  }

  getOrderDetail(data?): Observable<any> {
    return this.http.get(this.orderApiUrl + `/getById` + WrapHttpService.objToQuery(data));
  }

  getOrderInterruption(data?): Observable<any> {
    return this.http.get(this.interruptionApiUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  getInvoices(data?): Observable<any> {
    return this.http.get(this.invoiceUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  getInvoicePDF(data?): Observable<any> {
    return this.http.get(this.invoiceUrl + `/get/pdf` + WrapHttpService.objToQuery(data));
  }
}
