import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable()
export class MockUpService {
  discountsList: any = [];
  currentOpt: any = {};

  constructor(private http: HttpClient,
              private ngxXml2jsonService: NgxXml2jsonService) {
  }
}
