import {Component, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IAPIResponseModel, IProperty, IPropertyType, Site} from '../../model/master';
import {map, Observable} from 'rxjs';
import {MasterService} from '../../service/master.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent implements OnInit {
  isFormView = signal<boolean>(false);
  formObj: Site = new Site();
  masterSrv = inject(MasterService);
  gridData: Site[] =[];
  propertyList: IProperty[] =[];
  @ViewChild('propertyModel') modal: ElementRef | undefined;
  currentSiteId: number = 0;

  propertyType$: Observable<IPropertyType[]> = new Observable<IPropertyType[]>();
  propertyForm: FormGroup = new FormGroup({});



  constructor() {
    this.propertyType$ = this.masterSrv.getAllPropertyType().pipe(
      map((item: IAPIResponseModel)=> {
        return item.data;
      })
    );
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getGridData();
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

  getGridData(){
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel)=>{
      this.gridData = res.data;
    })
  }
  getProperties(){
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel)=>{
      this.propertyList = res.data.filter((m: any) => m.siteId === this.currentSiteId);
    })
  }
  openModal(data: Site){
    this.currentSiteId = data.siteId;
    this.initializeForm();
    this.getProperties();
    if (this.modal) {
      this.modal.nativeElement.style.display = 'block'
    }
  }
  closeModal(){
    if (this.modal) {
      this.modal.nativeElement.style.display = 'none'
    }
  }

  toggleView(){
    this.isFormView.update(value => !value)
  }

  onSave(){
    this.masterSrv.addSite(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if (res.result) {
        alert('Record Saved');
        this.getGridData();
        this.toggleView();
      }else{
        alert(res.message);
      }
    })
  }
  onSaveProperty(){
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel)=>{
      if (res.result) {
        alert('Record Saved');
        this.getProperties();
      }else{
        alert(res.message);
      }
    })
  }
  onEdit(data: Site ){
    this.formObj = data;
    this.toggleView();
  }
  onEditProperty(data : IProperty){
    this.propertyForm.patchValue(data);
  }
  onUpdate(){
    this.masterSrv.updateSites(this.formObj).subscribe((res: IAPIResponseModel)=>{
      if (res.result) {
        alert('Record Updated');
        this.getGridData();
        this.toggleView();
      }else{
        alert(res.message);
      }
    })
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
  }
  onDelete(data: Site){
    const isDelete = confirm('Are you sure you want to delete this site?');
    if (isDelete){
      this.masterSrv.deleteSitesById(data.siteId).subscribe((res: IAPIResponseModel)=>{
        if (res.result) {
          alert('Record Deleted');
          this.getGridData();
        }else{
          alert(res.message);
        }
      })
    }
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

}
