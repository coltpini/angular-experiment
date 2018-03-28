import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './data/in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { ListComponent }   from './layouts/list/list.component';
import { DetailComponent }  from './layouts/detail/detail.component';
import { FliesComponent }      from './layouts/flies/flies.component';
import { FlySearchComponent }  from './components/fly-search/fly-search.component';
import { FlyService }          from './fly.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    ListComponent,
    FliesComponent,
    DetailComponent,
    FlySearchComponent
  ],
  providers: [ FlyService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
