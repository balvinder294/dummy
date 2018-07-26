import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private apiUrl = 'http://localhost:3000/api/v1';

  private AngularGeneratorUrl = `${this.apiUrl}/angular-generator`;

  constructor(
    private http: HttpClient
  ) {

   }

  checkAPI (req: any) {
    return this.http.post(`${this.AngularGeneratorUrl}/check`, req)
       .pipe(map(
          res => {
           return res;
          }
       ));
  }

  generateAngularCli(req: any) {
    return this.http.post(`${this.AngularGeneratorUrl}/generate-angular-cli`, req)
      .pipe(map(
        res => {
          return res;
        }
      ));
  }
}
