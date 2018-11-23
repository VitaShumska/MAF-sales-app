import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class PropertiesService {
  API_URL  =  'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/';
  CMS_API_URL  =  'https://admin.mafsalesapp.com/unit-type/';

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }

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
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.API_URL + 'products/' + id, {headers});
  }

  getPropertiesContent(type): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.CMS_API_URL + '?type=' + type, {headers});
  }

  getPropertiesContentList(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.CMS_API_URL + 'unit-types/previews/', {headers});
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
