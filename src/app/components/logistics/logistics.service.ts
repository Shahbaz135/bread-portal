import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/logistics';

  constructor(public http: WrapHttpService) { }

  getOrderSupplier(data): Observable<any> {
    return this.http.get(this.apiUrl + `/orderSupplier` + WrapHttpService.objToQuery(data));
  }

  getDeliveryList(data): Observable<any> {
    return this.http.get(this.apiUrl + `/deliveryList` + WrapHttpService.objToQuery(data));
  }

  getSupplierPDF(data) {
    window.open(this.apiUrl + `/orderSupplier/getPDF` + WrapHttpService.objToQuery(data));
  }

}
