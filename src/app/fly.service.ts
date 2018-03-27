import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Fly } from './data/fly';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FlyService {

  private fliesUrl = 'api/flies'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  getFlies (): Observable<Fly[]> {
    return this.http.get<Fly[]>(this.fliesUrl)
      .pipe(
        tap(flies => this.log(`fetched flies`)),
        catchError(this.handleError('getFlies', []))
      );
  }

  getFlyNo404<Data>(id: number): Observable<Fly> {
    const url = `${this.fliesUrl}/?id=${id}`;
    return this.http.get<Fly[]>(url)
      .pipe(
        map(flies => flies[0]),
        tap(f => {
          const outcome = f ? `fetched` : `did not find`;
          this.log(`${outcome} fly id=${id}`);
        }),
        catchError(this.handleError<Fly>(`getFly id=${id}`))
      );
  }

  getFly(id: number): Observable<Fly> {
    const url = `${this.fliesUrl}/${id}`;
    return this.http.get<Fly>(url).pipe(
      tap(_ => this.log(`fetched fly id=${id}`)),
      catchError(this.handleError<Fly>(`getFly id=${id}`))
    );
  }

  searchFlies(term: string): Observable<Fly[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Fly[]>(`api/flies/?name=${term}`).pipe(
      tap(_ => this.log(`found flies matching "${term}"`)),
      catchError(this.handleError<Fly[]>('searchFlies', []))
    );
  }

  addFly (fly: Fly): Observable<Fly> {
    return this.http.post<Fly>(this.fliesUrl, fly, httpOptions).pipe(
      tap((fly: Fly) => this.log(`added fly w/ id=${fly.id}`)),
      catchError(this.handleError<Fly>('addFly'))
    );
  }

  deleteFly (fly: Fly | number): Observable<Fly> {
    const id = typeof fly === 'number' ? fly : fly.id;
    const url = `${this.fliesUrl}/${id}`;

    return this.http.delete<Fly>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted fly id=${id}`)),
      catchError(this.handleError<Fly>('deleteFly'))
    );
  }

  updateFly (fly: Fly): Observable<any> {
    return this.http.put(this.fliesUrl, fly, httpOptions).pipe(
      tap(_ => this.log(`updated fly id=${fly.id}`)),
      catchError(this.handleError<any>('updateFly'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('FlyService: ' + message);
  }
}
