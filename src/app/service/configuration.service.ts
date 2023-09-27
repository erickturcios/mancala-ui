import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { ConfigurationDto } from '../dto/configuration-dto';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient
    ) { }

  getOrCreateConfiguration(sessionId: string): Observable<ConfigurationDto>{
    let url = `${environment.apiURL}/configuration/${sessionId}`;
    return this.http.post<ConfigurationDto>(url,'')
          .pipe(
              catchError(
                this.handleError<ConfigurationDto>('getOrCreateConfiguration')
              )
            );

  }

  saveConfiguration(configuration : ConfigurationDto): Observable<ConfigurationDto>{
    let url = `${environment.apiURL}/configuration`;
    return this.http.post<ConfigurationDto>(url, configuration)
          .pipe(
              catchError(
                this.handleError<ConfigurationDto>('saveConfiguration')
              )
            );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
