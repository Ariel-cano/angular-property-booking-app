import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IAPIResponseModel, IProperty, IPropertyType, Site} from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllPropertyType(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyType')
  }
  savePropertyType(obj: IPropertyType): Observable<IAPIResponseModel> {
    const newObh = [obj]
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyType', newObh)
  }
  updatePropertyType(obj: IPropertyType): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyType', obj)
  }
  deletePropertyTypeById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + `DeletePropertyTypeById?id=${id}`)
  }
  addSite(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddSites', obj)
  }

  getAllSites(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllSites')
  }
  updateSites(obj: Site): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdateSites', obj)
  }
  deleteSitesById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + `DeleteSitesById?id=${id}`)
  }
  saveProperty(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyMasters', obj)
  }
  getAllPropertyMasters(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyMasters')
  }
  deletePropertyMasterById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(environment.API_URL + `DeletePropertyMasterById?propertyId=${id}`)
  }
  updatePropertyMasters(obj: IProperty): Observable<IAPIResponseModel> {
    return this.http.put<IAPIResponseModel>(environment.API_URL + 'UpdatePropertyMasters', obj)
  }
  getAllPropertyBySiteId(id: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBySiteId?siteid='+id)
  }
  onSaveBooking(obj: Site): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(environment.API_URL + 'AddPropertyBooking', obj)
  }
  getAllPropertyBookingBySiteId(id: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBookingBySiteId?siteid='+id)
  }
  getAllCustomers(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllCustomer')
  }
  getAllPropertyBooking(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'GetAllPropertyBooking')
  }
  getSiteDetails(id: number): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(environment.API_URL + 'getSiteDetails?siteId='+id)
  }







}
