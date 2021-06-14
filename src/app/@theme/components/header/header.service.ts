import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headerInformation = null;

  constructor() { }


  assignHeaderInformation(headerInformation: any) {
    this.headerInformation = headerInformation;
  }

  updateHeaderProductDescription(productDescription: any) {
    this.headerInformation.productDescription = productDescription;
  }

  updateHeaderEnterpriseName(enterpriseName: any) {
    this.headerInformation.enterpriseName = enterpriseName;
  }

}
