import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Fly } from './data/fly';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FlyService {

  private fliesUrl = 'api/flies'; 

  constructor(private http: HttpClient) { }
  
  getFlies(): Observable<Fly[]> {
    return this.http.get<Fly[]>(this.fliesUrl)
      .pipe(
        catchError(this.handleError('getFlies', []))
      );
  }

  getTags(): Observable<string[]>{
    return new Observable( observer => {
      this.getFlies().subscribe(flies => {
        let tags:string[] = flies.reduce( (a: string[], n: Fly) => [...a, ...n.tags], [])
        //TODO: figure out why the observer is a subscriber object. It is different than the documentation.
        observer.destination.next( tags.filter( (tag, i, arr) => arr.indexOf(tag) === i))
      })
    })
  }

  getFlyNo404<Data>(id: number): Observable<Fly> {
    const url = `${this.fliesUrl}/?id=${id}`;
    return this.http.get<Fly[]>(url)
      .pipe(
        map(flies => flies[0]),
        catchError(this.handleError<Fly>(`getFly id=${id}`))
      );
  }

  getFly(id: string): Observable<Fly> {
    const url = `${this.fliesUrl}/${id}`;
    return this.http.get<Fly>(url).pipe(
      catchError(this.handleError<Fly>(`getFly id=${id}`))
    );
  }

  searchFlies(term: string): Observable<Fly[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Fly[]>(`api/flies/?name=${term}`).pipe(
      catchError(this.handleError<Fly[]>('searchFlies', []))
    );
  }

  addFly (fly: Fly): Observable<Fly> {
    return this.http.post<Fly>(this.fliesUrl, fly, httpOptions).pipe(
      catchError(this.handleError<Fly>('addFly'))
    );
  }

  deleteFly (fly: Fly | number): Observable<Fly> {
    const id = typeof fly === 'number' ? fly : fly.id;
    const url = `${this.fliesUrl}/${id}`;

    return this.http.delete<Fly>(url, httpOptions).pipe(
      catchError(this.handleError<Fly>('deleteFly'))
    );
  }

  updateFly (fly: Fly): Observable<any> {
    return this.http.put(this.fliesUrl, fly, httpOptions).pipe(
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

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
