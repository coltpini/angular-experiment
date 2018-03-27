import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './data/in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './layouts/dashboard/dashboard.component';
import { FlyDetailComponent }  from './components/fly-detail/fly-detail.component';
import { FliesComponent }      from './layouts/flies/flies.component';
import { FlySearchComponent }  from './components/fly-search/fly-search.component';
import { FlyService }          from './fly.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';

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
    DashboardComponent,
    FliesComponent,
    FlyDetailComponent,
    MessagesComponent,
    FlySearchComponent
  ],
  providers: [ FlyService, MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
