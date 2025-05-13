import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { createShortUrl } from './models/createShortUrl.model';
import { ApiResponse } from './models/helpers.model';

@Injectable({
  providedIn: 'root'
})

export class shortUrlService {
  private readonly apiUrl = `${environment.apiUrl}/api/ApiJisShortUrl`;
  private readonly RETRY_COUNT = 3;

  private readonly endpoints = {
    getOriginalUrl: (id: number | string) => `${this.apiUrl}/GetOriginalUrl/${id}`,
    create: () => `${this.apiUrl}/CreateRecord`,
    delete: (id: number) => `${this.apiUrl}/DeleteRecord/${id}`,
    clickCount: (id: number) => `${this.apiUrl}/GetClickCountByUidAsync/${id}`,
    expiry: (id: number) => `${this.apiUrl}/${id}`
  };

  constructor(private http: HttpClient) { }

  getOriginalUrlById(pUid: number): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(this.endpoints.getOriginalUrl(pUid)).pipe(this.handleRequest());
  }

  getOriginalUrlByShortCode(pShortCode: string): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(this.endpoints.getOriginalUrl(pShortCode)).pipe(this.handleRequest());
  }

  createShortCode(pCreateShortCode: createShortUrl): Observable<ApiResponse<createShortUrl>> {
    return this.http.post<ApiResponse<createShortUrl>>(this.endpoints.create(), pCreateShortCode).pipe(this.handleRequest());
  }

  deleteShortCode(pUid: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(this.endpoints.delete(pUid)).pipe(this.handleRequest());
  }

  getClickCount(pUid: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.endpoints.clickCount(pUid)).pipe(this.handleRequest());
  }

  getDaysToExpiry(pUid: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.endpoints.expiry(pUid)).pipe(this.handleRequest());
  }




  private handleRequest<T>() {
    return (source: Observable<T>) =>
      source.pipe(
        retry(this.RETRY_COUNT),
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Backend returned unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = `Server error (${error.status}): ${error.error?.message || error.message}`;
    }

    return throwError (() =>
      new Error('Something went wrong; please try again later.')
    );
  }
}
