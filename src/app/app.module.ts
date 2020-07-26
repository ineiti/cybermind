import 'reflect-metadata';
import '../polyfills';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {NewNodesComponent} from './newNodes/new-nodes.component';
import {ListComponent} from './newNodes/list/list.component';
import {DetailComponent} from './newNodes/detail/detail.component';
import {TagsComponent} from './newNodes/tags/tags.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NewNodesComponent, ListComponent, DetailComponent, TagsComponent],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
