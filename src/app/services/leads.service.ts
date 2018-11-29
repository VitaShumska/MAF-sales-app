import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class LeadsService {
  API_URL = 'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/';
  //////Values for creating opportunity/////
  contactName;
  keyContactId;
  backUrl;

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }

  ////////////Ledas////////////////

  getLeads(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.API_URL + 'leads/?totalResults=true&offset=' + offset + '&limit=' + limit + '&orderBy=LeadNumber:desc', {headers});
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
      filterParams.lastUpdate ? (filterParameters += 'LastUpdateDate>=' + filterParams.lastUpdate + 1 + ';') : false;
      filterParams.creation ? (filterParameters += 'CreationDate>=' + filterParams.creation + ';') : false;
      filterParams.assignedTo ? (filterParameters += 'OwnerPartyName=' + filterParams.assignedTo + ';') : false;
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

  createLead(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.API_URL + '/leads', data, {headers});
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
      filterParams.lastUpdate ? (filterParameters += 'LastUpdateDate>=' + filterParams.lastUpdate + 1 + ';') : false;
      filterParams.creation ? (filterParameters += 'CreationDate>=' + filterParams.creation + ';') : false;
      filterParams.assignedTo ? (filterParameters += 'OwnerName=' + filterParams.assignedTo + ';') : false;
      filterParams.rank ? (filterParameters += 'Rank=' + filterParams.rank + ';') : false;
      filterParams.qualification ? (filterParameters += 'QualificationScore=' + filterParams.qualification + ';') : false;
      filterParams.nationality ? (filterParameters += 'OwnerName=' + filterParams.assignedTo + ';') : false;
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
    return this.http.get(this.API_URL + 'contacts/?q=PartyId=' + name, {headers});
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

  createContact(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.API_URL + 'contacts', data, {headers});
  }

  updateContact(id, data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers = headers.append('Accept', 'application/json');
    return this.http.patch(this.API_URL + 'contacts/' + id, data, {headers});
  }

  getOpportunities(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    // return this.http.get(this.API_URL + 'opportunities', {headers});
    return this.http.get(this.API_URL + 'opportunities/?totalResults=true&offset=' + offset + '&limit=' + limit, {headers});
  }

  getOpportunity(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'opportunities/37244', {headers});
  }

  updateRestOpportunity(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Accept', 'application/json');
    const data = {
      'OptyId': 300000009452048,
      'StatusCode': 'WON'
    };
    return this.http.patch(this.API_URL + 'opportunities/37244', data, {headers});
  }

  createRestOpportunity(name, contactId, unitId): Observable<any> {
    console.log('create');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Accept', 'application/json');
    const data = {
      // 'Name': name,
      'KeyContactId': contactId,
      // 'UnitNumber_c': unitId
    };
    return this.http.post(this.API_URL + 'opportunities', data, {headers});
  }

  getDiscount(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + '/MAF_DiscountOpportunity_c/?q=MAF_OptyId_Id_c=300000007014896', {headers});
  }

  createOpportunity(name, contactId, unitId) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://ebrl-test.fa.em2.oraclecloud.com:443/crmService/OpportunityService', true);
    let updatedOpportunity: any = {};

    // The following variable contains the xml SOAP request.
    const data =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/types/" xmlns:opp="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/" xmlns:rev="http://xmlns.oracle.com/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:not="http://xmlns.oracle.com/apps/crmCommon/notes/noteService" xmlns:not1="http://xmlns.oracle.com/apps/crmCommon/notes/flex/noteDff/" xmlns:rev1="http://xmlns.oracle.com/oracle/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:act="http://xmlns.oracle.com/apps/crmCommon/activities/activitiesService/">
       <soapenv:Header/>
       <soapenv:Body>
          <typ:createOpportunity>
             <typ:opportunity>
                <opp:Name>` + name + `</opp:Name>
                <opp:KeyContactId>` + contactId + `</opp:KeyContactId>
                <opp:UnitNumber_c>` + unitId + `</opp:UnitNumber_c>
             </typ:opportunity>
          </typ:createOpportunity>
       </soapenv:Body>
    </soapenv:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          // Here I'm getting the value contained by the <return> node.
          const responseList = xml.getElementsByTagName('ns3:result')[0].childNodes;
          for (let i = 0; i < responseList.length; i++) {
            updatedOpportunity[responseList[i].localName] = responseList[i].textContent;
          }
        }
      }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(data);

    return updatedOpportunity;
  }


//////////////////Doesn't work/////////////
  updateOpportunity() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('PATCH', 'https://ebrl-test.fa.em2.oraclecloud.com:443/crmService/OpportunityService', true);
    let createdOpportunity: any = {};

    // The following variable contains the xml SOAP request.
    const data =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/types/" xmlns:opp="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/" xmlns:rev="http://xmlns.oracle.com/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:not="http://xmlns.oracle.com/apps/crmCommon/notes/noteService" xmlns:not1="http://xmlns.oracle.com/apps/crmCommon/notes/flex/noteDff/" xmlns:rev1="http://xmlns.oracle.com/oracle/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:act="http://xmlns.oracle.com/apps/crmCommon/activities/activitiesService/">
       <soapenv:Header/>
       <soapenv:Body>
          <typ:updateOpportunity>
             <typ:opportunity>
                <opp:OptyId>300000009452048</opp:OptyId>
                <opp:StatusCode>WON</opp:StatusCode>
             </typ:opportunity>
          </typ:updateOpportunity>
       </soapenv:Body>
    </soapenv:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          // Here I'm getting the value contained by the <return> node.
          const responseList = xml.getElementsByTagName('ns3:result')[0].childNodes;
          for (let i = 0; i < responseList.length; i++) {
            createdOpportunity[responseList[i].localName] = responseList[i].textContent;
          }
        }
      }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(data);

    return createdOpportunity;
  }

  ///////////////Additional function//////////

  isFilterEmpty(filter) {
    let filterEmpty = true;
    if (filter) {
      Object.keys(filter).map(key => {
        if (filter[key] !== '') {
          filterEmpty = false;
        }
      });
    }
    console.log('filter', filterEmpty);
    return filterEmpty;
  }

  getXml() {
    const parser = new DOMParser();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get('https://mafsalesapp.com/static/cms_links.xml', {headers, responseType: 'text'})
      .map(xmlFile => {
        const xml = parser.parseFromString(xmlFile, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml);
        return obj;
      });
  }
}
