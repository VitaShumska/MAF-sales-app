import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class ApiService {
  API_URL  =  'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/';
  token = 'MIIC0jCCAbqgAwIBAgIQMIStCylUh4xN2V8bUgGk0TANBgkqhkiG9w0BAQsFADAl' +
    'MSMwIQYDVQQDExpBREZTIFNpZ25pbmcgLSBhZGZzLm1hZi5hZTAeFw0xNzAzMzAx' +
    'ODA4NDNaFw0yMDAzMjkxODA4NDNaMCUxIzAhBgNVBAMTGkFERlMgU2lnbmluZyAt' +
    'IGFkZnMubWFmLmFlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3J0f' +
    '9aFRJGF9ZvHhIern8xdq8eLglsXAAiWM3UTOp1vsK9pCvhPDVpL7uFKk8A3pZA9U' +
    'l0QhD8SAGfJKSYG835N6F4C63XjB4KChJ84xXxogXTgINB5k+KvtNXX80VhWIzQT' +
    '0BdEbj4mh/zHjSdsErw1FwWM0i39RtzRbBE282dAGJdWBYLRxJ91tRANcV793+05' +
    'gDFogz5QR6Qry6iPG+UPWVhJosYG4HGCWWTQ97EYf+caWwloTGIger7wpFubhGBn' +
    'fy5OodQ5MKd/3b3jj8NOa6klDSBJMlYUqL07+LqwUk5Bte32jUT3V9nrd6vQLEMG' +
    'Vt0fjeCt0BvlnUPm5QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAeCgf1VqWuspbR' +
    'OQ6CHdWlV8PrubplO6azaBKO1pQHRxux0pPBN+HJFbAubAo/HEcq6fbqvt7M8b+S' +
    'hc33sWspBXDwpN9N/wgEwjFegfz70/Akj47OyTkcoHdiv+hl7YwQvqFHe4MjkhsA' +
    'oum6ufy/vm8UcWgV0chZhSut4MayGAWd4SxEcIhTqT4KYDRW4+ePp0CbKuFqFG5x' +
    'XLwQi5SYKQtIrNzX38+CUdwrb1OCEyO/q40x1Sv2mbtJjhImYvrOWDN/Jb4ngCbH' +
    'ySGj+3WAphLG5/FC6xIXICLrDk1s58uZsbKTDNY6EkQyiWUc6hPGLcSzZHS0lR8V' +
    'fdnRLGGB';

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }

  getProperties(offset, limit): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + this.token);
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:Maf@2019'));
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
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:Maf@2019'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'products/?totalResults=true&offset=' + offset + '&limit=' + limit + sortParameters + '&' + filterParameters, {headers});
  }

  getPropertiesById(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:Maf@2019'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + 'products/' + id, {headers});
  }

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
