import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxGalleryModule } from 'ngx-gallery';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material";
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio'

import { ApiService } from './services/api.service';
import { BreadcrumbsService } from './services/breadcrumbs.service';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { FilterCloseService } from './services/filter-close.service';

import { AppComponent } from './app.component';
import { BaseHeaderComponent } from './base/base-header/base-header.component';
import { BaseComponent } from './base/base.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { PropertiesListComponent } from './properies/properties-list/properties-list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProperiesDetailsComponent } from './properies/properies-details/properies-details.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FullScreenGalleryComponent } from './components/full-screen-gallery/full-screen-gallery.component';
import { LeadPersonalDetailsComponent } from './leads/lead-personal-details/lead-personal-details.component';
import { LeadDetailsComponent } from './leads/lead-details/lead-details.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { LeadArabicDetailsComponent } from './leads/lead-arabic-details/lead-arabic-details.component';
import { LeadAddressDetailsComponent } from './leads/lead-address-details/lead-address-details.component';
import { LeadIdentificationComponent } from './leads/lead-identification/lead-identification.component';
import { LeadEnquiryDetailsComponent } from './leads/lead-enquiry-details/lead-enquiry-details.component';
import { SelectPayplanDialogComponent } from './dialogs/select-payplan-dialog/select-payplan-dialog.component';

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
    ProperiesDetailsComponent,
    LoadingSpinnerComponent,
    FullScreenGalleryComponent,
    LeadPersonalDetailsComponent,
    LeadDetailsComponent,
    LeadArabicDetailsComponent,
    LeadAddressDetailsComponent,
    LeadIdentificationComponent,
    LeadEnquiryDetailsComponent,
    SelectPayplanDialogComponent
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
    MatSnackBarModule,
    MatPaginatorModule,
    AngularFileUploaderModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MDBBootstrapModule.forRoot()
],
  providers: [
    ApiService,
    BreadcrumbsService,
    LoadingSpinnerService,
    FilterCloseService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SelectPayplanDialogComponent
  ]
})
export class AppModule { }
