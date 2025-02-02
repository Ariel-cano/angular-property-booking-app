import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MasterService} from '../../service/master.service';
import {IAPIResponseModel, IProperty} from '../../model/master';
import {NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-property',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent implements OnInit {
  masterSrv = inject(MasterService);
  propertyList: IProperty[] =[];
  currentSiteId: number = 0;
  propertyForm: FormGroup = new FormGroup({});
  @ViewChild('propertiesModel') modal: ElementRef | undefined;
  visibleProperties: IProperty[] = [];
  firstBorder: number = 0;
  secondBorder: number = 12;

  constructor() {
    this.initializeForm();
  }


  ngOnInit(): void {
   this.getProperties();
  }

  openModal(data: IProperty){
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.propertyForm.patchValue(data);
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block'
    }
  }
  closeModal(){
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none'
    }
  }
  onUpdateProperty(){
    this.masterSrv.updatePropertyMasters(this.propertyForm.value).subscribe((res: IAPIResponseModel)=>{
      if (res.result) {
        alert('Record Updated');
        this.getProperties();
      }else{
        alert(res.message);
      }
    })
    this.closeModal();
  }

  initializeForm(){
    this.propertyForm = new FormGroup({
      propertyId: new FormControl(0),
      propertyNo: new FormControl(''),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(''),
      siteId:new FormControl(this.currentSiteId),
    })
  }


  getProperties(){
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel)=>{
      this.propertyList = res.data;
      this.updateVisibleProperties();
    })
  }

  onDeleteProperty(data: IProperty){
    const isDelete = confirm('Are you sure you want to delete this property?');
    if (isDelete){
      this.masterSrv.deletePropertyMasterById(data.propertyId).subscribe((res: IAPIResponseModel)=>{
        if (res.result) {
          alert('Record Deleted');
          this.getProperties();
        }else{
          alert(res.message);
        }
      })
    }
  }

  updateVisibleProperties(){
    if(this.secondBorder > this.propertyList.length){
      this.visibleProperties = this.propertyList.slice(this.firstBorder, this.propertyList.length);
    } else{
      this.visibleProperties = this.propertyList.slice(this.firstBorder, this.secondBorder);
    }
  }
  showMore() {
    this.firstBorder += 12;
    this.secondBorder += 12
    this.updateVisibleProperties();
  }
  showOld(){
    this.firstBorder -= 12;
    this.secondBorder -= 12;
    this.updateVisibleProperties();
  }

}
