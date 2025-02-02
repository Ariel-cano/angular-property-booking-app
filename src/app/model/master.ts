export interface IPropertyType{
  propertTypeId: number;
  propertyType: string;
}

export interface IAPIResponseModel{
  message: string;
  result: boolean;
  data: any;
}
export class Site {
  siteId: number;
  siteTitle: string;
  location: string;
  propertyTypeId: string;
  city: string;
  pincode: string;
  state: string;
  totalProperties: string;
  createdDate: Date;
  lastUpdatedDate: Date;

  constructor() {
    this.city = '';
    this.siteId = 0;
    this.siteTitle = '';
    this.createdDate = new Date();
    this.siteTitle = '';
    this.lastUpdatedDate = new Date();
    this.state = '';
    this.location = '';
    this.propertyTypeId = '';
    this.pincode = '';
    this.totalProperties = '';
  }
}
export interface IProperty {
  propertyId: number
  propertyNo: number
  facing: string
  totalArea: string
  rate: number
  siteId: number
}
export interface ICustomer {
  custId: number
  name: string
  mobile: string
  emailid: string
  address: string
}

