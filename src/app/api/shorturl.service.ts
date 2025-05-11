import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})

export class ShorturlService {
  private readonly apiUrl = `${environments.apiUrl}/api/ApiJisShortUrl`;

  constructor(private http: HttpClient) { }

  getOriginalUrl(pUid: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/GetOriginalUrl/${pUid}`).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError)
    );
  }

  getOriginalUrl(pShortCode: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/GetOriginalUrl/${pShortCode}`).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError)
    );
  }

  createShortCode(pCreateShortCode: CreateShortCode): Observable<CreateShortCode> {
    return this.http.post<CreateShortCode>(`${this.apiUrl}/CreateRecord`, pCreateShortCode).pipe(
      retry(1),
      map(response => response),
      catchError(this.handleError)
    );
  }

  deleteShortCode(pUid: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/DeleteRecord/${pUid}`).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError)
    )
  }

  getClickCount(pUid: number): Observable<number> {
    return this.http.get<string>(`${this.apiUrl}/GetClickCountByUidAsync/${pUid}`).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError)
    );
  }

  getDaysToExpiry(pUid: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${pUid}`).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend returned unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    return throwError (() =>
      new Error('Something went wrong; please try again later.');
    );
  }
}
