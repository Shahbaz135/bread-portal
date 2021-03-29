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
    return this.http.post(this.apiUrl + `/register`, data );
  }

  // getOrders(customerId): Observable<any> {
  //   const conditions: object = { CustomerId : customerId};
  //   return this.http.get(this.apiUrl + `/get` + WrapHttpService.objToQuery(conditions));
  // }
}
