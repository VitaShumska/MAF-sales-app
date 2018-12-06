import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class ApiService {
  API_URL  =  'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/latest/';

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }

  login(user) {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Authorization', 'Basic ' + btoa(user.name + ':' + user.password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.API_URL + 'MAF_Token_c?fields=MAF_Token_c', {headers});
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

  getDropdownOption(param): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + '/fndStaticLookups?finder=LookupTypeActiveEnabledOrBindCodeFinder%3BBindLookupType%3D' + param + '&limit=100', {headers});
  }

  ///////////////Additional function//////////

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

  googleTranslateElementInit(url): Observable<any> {
    return this.http.get(url);
  }

  soapCall() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://ebrl-test.fa.em2.oraclecloud.com:443/crmService/OpportunityService', true);

    // The following variable contains the xml SOAP request.
    const sr =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:typ="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/types/" xmlns:opp="http://xmlns.oracle.com/apps/sales/opptyMgmt/opportunities/opportunityService/" xmlns:rev="http://xmlns.oracle.com/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:not="http://xmlns.oracle.com/apps/crmCommon/notes/noteService" xmlns:not1="http://xmlns.oracle.com/apps/crmCommon/notes/flex/noteDff/" xmlns:rev1="http://xmlns.oracle.com/oracle/apps/sales/opptyMgmt/revenues/revenueService/" xmlns:act="http://xmlns.oracle.com/apps/crmCommon/activities/activitiesService/">
       <soapenv:Header/>
       <soapenv:Body>
          <typ:createOpportunity>
             <typ:opportunity>
                <opp:Name>Merve Can</opp:Name>
                <opp:KeyContactId>300000009315760</opp:KeyContactId>
             </typ:opportunity>
          </typ:createOpportunity>
       </soapenv:Body>
    </soapenv:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
      console.log('here!!!!!!', xmlhttp.responseXML, xmlhttp.readyState, xmlhttp.status);
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          const xml = xmlhttp.responseXML;
          // Here I'm getting the value contained by the <return> node.
          const response_number = parseInt(xml.getElementsByTagName('return')[0].childNodes[0].nodeValue);
          // Print result square number.
          console.log(xml);
        }
      }
    };
    // Send the POST request.
    xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(sr);
  }
}
