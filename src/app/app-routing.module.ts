import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { PropertiesListComponent } from './properies/properties-list/properties-list.component';
import { ProperiesDetailsComponent } from './properies/properies-details/properies-details.component';
import { LeadDetailsComponent } from './leads/lead-details/lead-details.component';

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
      { path: 'unit-details/:unitId', component: ProperiesDetailsComponent },
      { path: 'lead-details/:leadId', component: LeadDetailsComponent }
    ]
  },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
