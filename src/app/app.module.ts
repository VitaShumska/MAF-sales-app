import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGalleryModule } from 'ngx-gallery';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ApiService } from './services/api.service';
import { BreadcrumbsService } from './services/breadcrumbs.service';

import { AppComponent } from './app.component';
import { BaseHeaderComponent } from './base/base-header/base-header.component';
import { BaseComponent } from './base/base.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeadsListComponent } from './leads-list/leads-list.component';
import { PropertiesListComponent } from './properies/properties-list/properties-list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProperiesDetailsComponent } from './properies/properies-details/properies-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseHeaderComponent,
    BaseComponent,
    HomePageComponent,
    LeadsListComponent,
    PropertiesListComponent,
    FilterComponent,
    SearchComponent,
    ProperiesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxGalleryModule,
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot()
],
  providers: [
    ApiService,
    BreadcrumbsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
