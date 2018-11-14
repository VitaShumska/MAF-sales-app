import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class ApiService {
  API_URL  =  'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/';

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }

  ////////////Properties////////////////

  getProperties(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + this.token);
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.API_URL + 'products/?totalResults=true&offset=' + offset + '&limit=' + limit + '&q=MAF_ProjectName_c=Tilal Al Ghaf;MAF_Status_c=available&orderBy=MAF_UnitNumber_c', {headers});
  }

  getPropertiesWithFilter(offset, limit, sortParam?, filterParams?): Observable<any> {
    let filterParameters = 'q=MAF_ProjectName_c=Tilal Al Ghaf;MAF_Status_c=available;';
    // this.isFilterEmpty(filterParams) ? filterParameters = '' : filterParameters = 'q=';
    let sortParameters = '';
    if (filterParams) {
      filterParams.bedrooms ? (filterParameters += 'MAF_Bedroom_c=' + filterParams.bedrooms + ';') : false;
      filterParams.phase ? (filterParameters += 'MAF_PhaseName_c=' + filterParams.phase + ';') : false;
      filterParams.cluster ? (filterParameters += 'MAF_Cluster_c=' + filterParams.cluster + ';') : false;
      filterParams.buildingName ? (filterParameters += 'MAF_BuildingName_c=' + filterParams.buildingName + ';') : false;
      // filterParams.floor ? (filterParameters += 'MAF_FloorId_c=' + filterParams.floor + ';') : false;
      filterParams.productType  ? (filterParameters += 'MAF_ProductType_c=' + filterParams.productType + ';') : false;
      (filterParams.unitPriceFrom || filterParams.unitPriceTo)  ? (filterParameters += 'MAF_UnitPrice_c>=' + filterParams.unitPriceFrom + ' and <=' + filterParams.unitPriceTo + ';' ) : false;
      filterParams.unitType  ? (filterParameters += 'MAF_UnitType_c=' + filterParams.unitType + ';') : false;
      // filterParams.status  ? (filterParameters += 'MAF_Status_c=' + filterParams.status + ';') : false;
    }
    sortParam ? (sortParameters = '&orderBy=' + sortParam.key + ':' + sortParam.sort) : false;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'products/?totalResults=true&offset=' + offset + '&limit=' + limit + sortParameters + '&' + filterParameters, {headers});
  }

  getPropertiesById(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'products/' + id, {headers});
  }

  ////////////Ledas////////////////

  getLeads(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.API_URL + 'leads/?totalResults=true&offset=' + offset + '&limit=' + limit, {headers});
  }

  getLeadsWithFilter(offset, limit, sortParam?, filterParams?): Observable<any> {
    let filterParameters;
    this.isFilterEmpty(filterParams) ? filterParameters = '' : filterParameters = 'q=';
    let sortParameters = '';
    if (filterParams) {
      filterParams.leadName ? (filterParameters += 'PrimaryContactPartyName=' + filterParams.leadName + ';') : false;
      filterParams.phone ? (filterParameters += 'MAF_ContactPhone_c=' + filterParams.phone + ';') : false;
      filterParams.email ? (filterParameters += 'MAF_ContactEmail_c=' + filterParams.email + ';') : false;
      filterParams.leadNumber ? (filterParameters += 'LeadNumber=' + filterParams.leadNumber + ';') : false;
      filterParams.lastUpdate  ? (filterParameters += 'LastUpdateDate>=' + filterParams.lastUpdate + 1 + ';') : false;
      filterParams.creation  ? (filterParameters += 'CreationDate>=' + filterParams.creation + ';') : false;
      filterParams.assignedTo  ? (filterParameters += 'OwnerPartyName=' + filterParams.assignedTo + ';') : false;
    }
    sortParam ? (sortParameters = '&orderBy=' + sortParam.key + ':' + sortParam.sort) : false;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'leads/?totalResults=true&offset=' + offset + '&limit=' + limit + sortParameters + '&' + filterParameters, {headers});
  }

  getLeadById(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'leads/' + id, {headers});
  }

  getDropdownOption(param): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + '/fndStaticLookups?finder=LookupTypeActiveEnabledOrBindCodeFinder%3BBindLookupType%3D' + param + '&limit=100', {headers});
  }

  getContacts(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'contacts/?totalResults=true&offset=' + offset + '&limit=' + limit, {headers});
  }

  getContactsWithFilter(offset, limit, sortParam?, filterParams?): Observable<any> {
    let filterParameters;
    this.isFilterEmpty(filterParams) ? filterParameters = '' : filterParameters = 'q=';
    let sortParameters = '';
    if (filterParams) {
      filterParams.leadName ? (filterParameters += 'ContactName=' + filterParams.leadName + ';') : false;
      filterParams.phone ? (filterParameters += 'OverallPrimaryFormattedPhoneNumber=' + filterParams.phone + ';') : false;
      filterParams.email ? (filterParameters += 'EmailAddress=' + filterParams.email + ';') : false;
      filterParams.leadNumber ? (filterParameters += 'PartyNumber=' + filterParams.leadNumber + ';') : false;
      filterParams.lastUpdate  ? (filterParameters += 'LastUpdateDate>=' + filterParams.lastUpdate + 1 + ';') : false;
      filterParams.creation  ? (filterParameters += 'CreationDate>=' + filterParams.creation + ';') : false;
      filterParams.assignedTo  ? (filterParameters += 'OwnerName=' + filterParams.assignedTo + ';') : false;
    }
    sortParam ? (sortParameters = '&orderBy=' + sortParam.key + ':' + sortParam.sort) : false;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'leads/?totalResults=true&offset=' + offset + '&limit=' + limit + sortParameters + '&' + filterParameters, {headers});
  }

  getContactById(name): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'contacts/?q=ContactName=' + name, {headers});
  }

  getLeadsByPrimaryContact(name): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'leads/?q=PrimaryContactPartyName=' + name, {headers});
  }

  getIdentificationContactData(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + '/MAF_Identification_c/?q=MAF_Contact_Id_c=' + id, {headers});
  }



  ///////////////Additional function//////////

  getXml() {
    const parser = new DOMParser();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get('https://mafsalesapp.com/static/cms_links.xml', {headers, responseType: 'text'})
      .map (xmlFile => {
        const xml = parser.parseFromString(xmlFile, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj;
      });
  }

  isFilterEmpty (filter) {
    let filterEmpty = true;
    if (filter) {
      Object.keys(filter).map(key => {
        if ( filter[key] !== '' ) {
          filterEmpty = false;
        }
      });
    }
    return filterEmpty;
  }
}
