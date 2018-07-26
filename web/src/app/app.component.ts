import { Component } from '@angular/core';
import { BackendApiService } from './backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  angularCliResponse: any = {
    'SkipInstall': '',
    'angularProgress': '',
    'responseMessage': '',
    'AppName': '',
    'directory': ''
  };
  appFields: any = {
    appName: '',
    skipInstall: 'false'
  };
  // req object for check method
  req: any = {
    name: '',
    another: '',
    skipInstall: ''
  };
  constructor(private backendService: BackendApiService) {
    this.appFields = {};
  }

  checkApi() {
    return this.backendService.checkAPI(this.req).subscribe(data => {
      this.angularCliResponse = data;
    });
  }

  generateAngularCli() {
    this.angularCliResponse = '';
    return this.backendService.generateAngularCli(this.appFields).subscribe(data => {
      this.angularCliResponse = data;
      return this.angularCliResponse;
    });
  }
}
