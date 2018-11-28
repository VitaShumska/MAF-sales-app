import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { PropertiesListComponent } from './properies/properties-list/properties-list.component';
import { ProperiesDetailsComponent } from './properies/properies-details/properies-details.component';
import { ContactDetailsComponent } from './leads/contact-details/contact-details.component';
import {CreateLeadComponent} from "./leads/create-lead/create-lead.component";
import { OpportunitiesListComponent } from "./opportunities/opportunities-list/opportunities-list.component";

const routes: Routes = [
  // { path: '', component: BaseComponent },
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'leads', component: LeadsListComponent },
      { path: 'units', component: PropertiesListComponent },
      { path: 'opportunities', component: OpportunitiesListComponent },
      { path: 'unit-details/:unitId', component: ProperiesDetailsComponent },
      { path: 'contact-details/:contactId/:leadId', component: ContactDetailsComponent },
      { path: 'create-lead', component: CreateLeadComponent }
    ]
  },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
