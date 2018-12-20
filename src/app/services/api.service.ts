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

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    return;
  }

  ///////////////Additional function//////////

  getDropdownOption(param): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('SOAUSER:SOAUSER123'));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(this.API_URL + '/fndStaticLookups?finder=LookupTypeActiveEnabledOrBindCodeFinder%3BBindLookupType%3D' + param + '&limit=100', {headers});
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

  googleTranslateElementInit(url): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get(url, {headers});
  }
}
