import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class FranchiseService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/partner';

  constructor(public http: WrapHttpService) { }

  create(data): Observable<any> {
    return this.http.post(this.apiUrl + `/register`, data );
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + `/getAll`);
  }

  getById(data): Observable<any> {
    return this.http.get(this.apiUrl + `/getByPostalCode` + WrapHttpService.objToQuery(data));
  }

  update(data, id): Observable<any> {
    return this.http.put(this.apiUrl + `/` + id, data );
  }
}
