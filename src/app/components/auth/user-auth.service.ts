import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../../shared/services/common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/user';

  constructor(public http: WrapHttpService) { }

  login(data): Observable<any> {
    return this.http.post(this.apiUrl + `/login`, data );
  }
}
