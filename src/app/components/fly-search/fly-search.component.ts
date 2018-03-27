import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Fly } from '../../data/fly';
import { FlyService } from '../../fly.service';

@Component({
  selector: 'app-fly-search',
  templateUrl: './fly-search.component.html',
  styleUrls: [ './fly-search.component.css' ]
})
export class FlySearchComponent implements OnInit {
  flies$: Observable<Fly[]>;
  private searchTerms = new Subject<string>();

  constructor(private FlyService: FlyService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.flies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.FlyService.searchFlies(term)),
    );
  }
}
