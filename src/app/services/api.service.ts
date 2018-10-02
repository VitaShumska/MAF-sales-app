import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {map} from 'rxjs/add/operator/map';

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

  constructor(private http: HttpClient) {
  }

  getProperties() {
    return this.http.get(this.API_URL + 'products/?limit=300');
  }

  getPropertiesWithFilter(product_type?, phase?, unit_type?, model?, bedrooms?, budget?) {
    let filterParams = '';
    if (product_type) {
      filterParams += 'MAF_ProductType_c=' + product_type;
    }
    if (phase) {
      filterParams += 'MAF_PhaseName_c=' + phase;
    }
    if (unit_type) {
      filterParams += 'q=MAF_UnitType_c=' + unit_type;
    }
    if (model) {
      filterParams += 'q=MAF_UnitModel_c=' + model  + '&';
    }
    if (bedrooms) {
      filterParams += 'MAF_Bedroom_c=' + bedrooms;
    }
    if (budget) {
      filterParams += 'q=(MAF_UnitPrice_c<=' + budget;
    }
    return this.http.get(this.API_URL + 'products/?' + filterParams + '&limit=1000');
  }

  getPropertiesById(id) {
    return this.http.get(this.API_URL + 'products/' + id);
  }

}
