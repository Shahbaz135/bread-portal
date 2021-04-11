import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/customer';

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
}
