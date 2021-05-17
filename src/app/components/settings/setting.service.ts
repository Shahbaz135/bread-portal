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
  public readonly roleUrl = HttpConfig.getApiUrl() + '/role';
  public readonly userUrl = HttpConfig.getApiUrl() + '/user';
  public readonly deliveryChargeUrl = HttpConfig.getApiUrl() + '/deliveryCharges';
  public readonly bakeryUrl = HttpConfig.getApiUrl() + '/bakery';

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

  getAllRoles(data?): Observable<any> {
    return this.http.get(this.roleUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  createUser(data): Observable<any> {
    return this.http.post(this.userUrl + `/create`, data );
  }

  getUsers(data?): Observable<any> {
    return this.http.get(this.userUrl + `/getAll` + WrapHttpService.objToQuery(data));
  }

  updateUser(data, id): Observable<any> {
    return this.http.put(this.userUrl + `/` + id, data);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.userUrl + `/` + id);
  }

  updateCharges(data): Observable<any> {
    return this.http.post(this.deliveryChargeUrl + `/update`, data );
  }

  getCharges(data): Observable<any> {
    return this.http.get(this.deliveryChargeUrl + `/get` + WrapHttpService.objToQuery(data) );
  }

  updateBakery(data): Observable<any> {
    return this.http.post(this.bakeryUrl + `/update`, data );
  }

  getBakery(data): Observable<any> {
    return this.http.get(this.bakeryUrl + `/get` + WrapHttpService.objToQuery(data) );
  }
}
