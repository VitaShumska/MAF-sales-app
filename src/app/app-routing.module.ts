import { NgModule} from '@angular/core';
import { Routes, RouterModule, UrlSegmentGroup, Params, ParamMap } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LeadsListComponent } from './leads/leads-list/leads-list.component';
import { PropertiesListComponent } from './properies/properties-list/properties-list.component';
import { ProperiesDetailsComponent } from './properies/properies-details/properies-details.component';
import { ContactDetailsComponent } from './leads/contact-details/contact-details.component';
import { CreateLeadComponent } from './leads/create-lead/create-lead.component';
import { OpportunitiesListComponent } from './opportunities/opportunities-list/opportunities-list.component';
import { GenerateQuoteComponent } from './leads/generate-quote/generate-quote.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  // { path: '', component: BaseComponent },
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
      { path: 'leads', component: LeadsListComponent, canActivate: [AuthGuard] },
      { path: 'units', component: PropertiesListComponent, canActivate: [AuthGuard] },
      { path: 'opportunities', component: OpportunitiesListComponent, canActivate: [AuthGuard] },
      { path: 'unit-details/:unitId', component: ProperiesDetailsComponent, canActivate: [AuthGuard] },
      { path: 'contact-details/:contactId/:leadId', component: ContactDetailsComponent, canActivate: [AuthGuard] },
      { path: 'opportunity-details/:contactId/:optyId', component: ContactDetailsComponent, canActivate: [AuthGuard] },
      { path: 'create-lead', component: CreateLeadComponent, canActivate: [AuthGuard] },
      { path: 'generate-quote', component: GenerateQuoteComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
