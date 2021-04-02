import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/tours';
  public readonly userApiUrl = HttpConfig.getApiUrl() + '/users';

  constructor(public http: WrapHttpService) { }

  create(data): Observable<any> {
    return this.http.post(this.apiUrl + `/create`, data );
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + `/get`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.userApiUrl);
  }
}
