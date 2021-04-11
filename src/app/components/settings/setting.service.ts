import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public readonly categoryUrl = HttpConfig.getApiUrl() + '/category';
  public readonly productUrl = HttpConfig.getApiUrl() + '/products';
  public readonly deliveryAreaUrl = HttpConfig.getApiUrl() + '/deliveryArea';
  public readonly nonDeliveryDayUrl = HttpConfig.getApiUrl() + '/nonDelivery';

  constructor(public http: WrapHttpService) { }

  createCategory(data): Observable<any> {
    return this.http.post(this.categoryUrl + `/add`, data );
  }

  getAllCategories(data?): Observable<any> {
    return this.http.get(this.categoryUrl + `/getAll` + WrapHttpService.objToQuery(data));
  }

  editCategory(data, id): Observable<any> {
    return this.http.put(this.categoryUrl + `/update/` + id, data);
  }

  deleteCategory(id): Observable<any> {
    return this.http.delete(this.categoryUrl + `/delete/` + id);
  }

  addProduct(data): Observable<any> {
    return this.http.post(this.productUrl + `/add`, data );
  }

  getAllProduct(data?): Observable<any> {
    return this.http.get(this.productUrl + `/list` + WrapHttpService.objToQuery(data));
  }

  editProduct(data, id): Observable<any> {
    return this.http.put(this.productUrl + `/update/` + id, data);
  }

  addDeliveryArea(data): Observable<any> {
    return this.http.post(this.deliveryAreaUrl + `/add`, data );
  }

  getDeliveryArea(data?): Observable<any> {
    return this.http.get(this.deliveryAreaUrl + `/get` + WrapHttpService.objToQuery(data) );
  }

  updateDeliveryArea(data, id): Observable<any> {
    return this.http.put(this.deliveryAreaUrl + `/update/` + id, data);
  }

  deleteDeliveryArea(id): Observable<any> {
    return this.http.delete(this.deliveryAreaUrl + `/` + id);
  }

  addNonDeliveryDay(data): Observable<any> {
    return this.http.post(this.nonDeliveryDayUrl + `/add`, data );
  }

  getNonDeliveryDay(data?): Observable<any> {
    return this.http.get(this.nonDeliveryDayUrl + `/getAll` + WrapHttpService.objToQuery(data) );
  }

  deleteNonDeliveryDay(id): Observable<any> {
    return this.http.delete(this.nonDeliveryDayUrl + `/clear/` + id);
  }
}
