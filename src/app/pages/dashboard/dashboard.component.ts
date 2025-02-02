import {Component, inject, Injector, OnInit} from '@angular/core';
import {MasterService} from '../../service/master.service';
import {FormsModule} from '@angular/forms';
import {async, combineLatest, map, Observable} from 'rxjs';
import {IAPIResponseModel, ICustomer, Site} from '../../model/master';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  masterSrv = inject(MasterService);
  customersNumber$: Observable<number> = new Observable<number>();
  sitesNumber$: Observable<number> = new Observable<number>();
  propertiesNumber$: Observable<number> = new Observable<number>();
  propertyTypesNumber$: Observable<number> = new Observable<number>();
  propertyBookingNumber$: Observable<number> = new Observable<number>();
  propertyAvailableNumber: number = 0;





  ngOnInit(): void {
    this.getCustomersNumber();
    this.getSitesNumber();
    this.getPropertiesNumber();
    this.getPropertyTypesNumber();
    this.getPropertyBookingNumber();
    combineLatest([
      this.propertiesNumber$,
      this.propertyBookingNumber$
    ]).pipe(
      map(([all, booked]) => all - booked)
    ).subscribe(result => {
      this.propertyAvailableNumber = result;
    });
  }

  getCustomersNumber(){
    this.customersNumber$ = this.masterSrv.getAllCustomers().pipe(
      map((res: IAPIResponseModel) => {
        return res.data.length;
      })
    );
  }
  getSitesNumber(){
    this.sitesNumber$ = this.masterSrv.getAllSites().pipe(
      map((res: IAPIResponseModel) => {
        return res.data.length;
      })
    );
  }
  getPropertiesNumber(){
    this.propertiesNumber$ = this.masterSrv.getAllPropertyMasters().pipe(
      map((res: IAPIResponseModel) => {
        return res.data.length;
      })
    );
  }
  getPropertyTypesNumber(){
    this.propertyTypesNumber$ = this.masterSrv.getAllPropertyType().pipe(
      map((res: IAPIResponseModel) => {
        return res.data.length;
      })
    );
  }
  getPropertyBookingNumber(){
    this.propertyBookingNumber$ = this.masterSrv.getAllPropertyBooking().pipe(
      map((res: IAPIResponseModel) => {
        return res.data.length;
      })
    );
  }




}
