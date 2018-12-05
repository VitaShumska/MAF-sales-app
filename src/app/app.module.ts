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
import { MatDatepickerModule, MatNativeDateModule, DateAdapter } from "@angular/material";
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { MatMenuModule } from '@angular/material/menu';
import { DateFormat } from './date-format';

import { ApiService } from './services/api.service';
import { PropertiesService } from './services/properties.service';
import { LeadsService } from './services/leads.service';
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
import { ContactPersonalDetailsComponent } from './leads/contact-personal-details/contact-personal-details.component';
import { ContactDetailsComponent } from './leads/contact-details/contact-details.component';
import { ContactArabicDetailsComponent } from './leads/contact-arabic-details/contact-arabic-details.component';
import { ContactAddressDetailsComponent } from './leads/contact-address-details/contact-address-details.component';
import { ContactIdentificationComponent } from './leads/contact-identification/contact-identification.component';
import { ContactEnquiryDetailsComponent } from './leads/contact-enquiry-details/contact-enquiry-details.component';
import { SelectPayplanDialogComponent } from './dialogs/select-payplan-dialog/select-payplan-dialog.component';
import { CreateLeadComponent } from './leads/create-lead/create-lead.component';
import { DiscountDialogComponent } from './dialogs/discount-dialog/discount-dialog.component';
import { OpportunitiesListComponent } from './opportunities/opportunities-list/opportunities-list.component';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import { GenerateQuoteComponent } from './leads/generate-quote/generate-quote.component';

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
    ContactPersonalDetailsComponent,
    ContactDetailsComponent,
    ContactArabicDetailsComponent,
    ContactAddressDetailsComponent,
    ContactIdentificationComponent,
    ContactEnquiryDetailsComponent,
    SelectPayplanDialogComponent,
    CreateLeadComponent,
    DiscountDialogComponent,
    OpportunitiesListComponent,
    InfoDialogComponent,
    GenerateQuoteComponent
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
    MatMenuModule,
    MDBBootstrapModule.forRoot()
],
  providers: [
    ApiService,
    LeadsService,
    PropertiesService,
    BreadcrumbsService,
    LoadingSpinnerService,
    FilterCloseService,
    { provide: DateAdapter, useClass: DateFormat }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SelectPayplanDialogComponent,
    DiscountDialogComponent,
    InfoDialogComponent
  ]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in');
  }
}

