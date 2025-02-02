import {Component, inject} from '@angular/core';
import {map, Observable} from 'rxjs';
import {IAPIResponseModel, IProperty, Site} from '../../model/master';
import {MasterService} from '../../service/master.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  sites$: Observable<Site[]> = new Observable<Site[]>();
  masterSrc = inject(MasterService);
  siteId: number = 0;
  propertyList: IProperty[] = [];
  bookingList: any[] = [];
  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;


  constructor() {
    this.initializeForm();
    this.sites$ = this.masterSrc.getAllSites().pipe(
      map((res: IAPIResponseModel)=>{
        return res.data;
      })
    );
  }

  initializeForm(){
    this.bookingForm = new FormGroup({
      bookingId: new FormControl(0),
      propertyId: new FormControl(this.currentPropertyId),
      bookindDate: new FormControl(new Date()),
      bookingRate: new FormControl(0),
      totalAmont: new FormControl(0),
      custId: new FormControl(0),
      name: new FormControl(''),
      mobile: new FormControl(''),
      emailid: new FormControl(''),
      address: new FormControl('')
    })
  }

  checkIfPropertyAvailable(propertyId: number) {
    const record = this.bookingList.find(m=> m.propertyId == propertyId);
    if (record != undefined) {
      return record;
    }else{
      return null
    }
  }

  getProperties() {
    this.getBookingBySiteId()
      this.masterSrc.getAllPropertyBySiteId(this.siteId).subscribe((res: IAPIResponseModel)=>{
        this.propertyList = res.data;
      });
  }
  getBookingBySiteId() {
    this.masterSrc.getAllPropertyBookingBySiteId(this.siteId).subscribe((res: IAPIResponseModel)=>{
      this.bookingList = res.data;
    });
  }
  openModal(data: IProperty){
    this.currentPropertyId = data.propertyId;
    this.initializeForm();
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block'
    }
  }
  closeModal(){
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none'
    }
  }
  doBooking(){
    this.masterSrc.onSaveBooking(this.bookingForm.value).subscribe((res: IAPIResponseModel)=>{
      if (res.result) {
        alert('Record Saved');
        this.getBookingBySiteId()
      }else{
        alert(res.message);
      }
    })
    this.closeModal();
  }


}
