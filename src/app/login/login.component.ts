import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any = {
   'name': '',
   'password': ''
  };

  breadcrumbObj = {
    name: '',
    backUrl: 'https://ebrl-test.fa.em2.oraclecloud.com',
    param: 0
  };

  constructor(private apiService: ApiService,
              private router: Router,
              private breadcrumbs:  BreadcrumbsService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.checkToken();
    this.breadcrumbsArr();
  }

  login() {
    this.loadingSpinner.show();
    this.apiService.login(this.userData)
      .subscribe(data => {
        this.loadingSpinner.hide();
        const token = data['items'][0]['MAF_Token_c'];
        localStorage.setItem('token', token);
        localStorage.setItem('userName', this.userData.name);
        this.userData = {
          'name': '',
          'password': ''
        };
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('User unauthorized', 'OK');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }
}
