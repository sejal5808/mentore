import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ApiService } from '../admin-service/api.service';
import { GlobleService } from '../admin-service/globle.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
declare var $: any
@Component({
  selector: 'app-chiled',
  templateUrl: './chiled.component.html',
  styleUrls: ['./chiled.component.scss']
})
export class ChiledComponent {
  @ViewChild('dataForm') dataForm!: NgForm;


  modalLabel: any = ""

  formObj: any = {
    name: '',
    price: ''
  }
  shareData: any = [];
  courseData: any = [];

  headers: any = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" }

  ]

  constructor(public gb: GlobleService, private service: ApiService) { }
  ngOnInit() {
    this.getData();
  }


  getData() {
    this.service.getItems('courses').then((_res: any) => {
      this.courseData = _res.courses;
    })
  }

  isModalOpen: boolean = false;

  openModal(dataObj: any) {

    this.modalLabel = dataObj['key'];

    if (dataObj['key'] == 'add') {
      $('#exampleModal').modal('show');
    } else {
      this.formObj = { ...dataObj['data'] };
      this.formObj.id = dataObj.data._id
      console.log("gormobj",this.formObj)
      $('#exampleModal').modal('show');

    }
  }

  closeModal() {
    this.isModalOpen = false;
    $('#exampleModal').modal('hide');
    this.dataForm.resetForm();
  }
  save(form: any) {
    this.service.postApi(this.formObj, 'Add-courses').then((_res: any) => {
      if (_res && _res['status']) {
        this.courseData.push(_res.data);
        this.service.toaster('success', _res.message);
        this.closeModal();
      }
      else {
        this.service.toaster('error', _res.message);
        this.closeModal();
      }
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }
  update(form:any){
    this.service.updateItem(this.formObj.id, this.formObj).subscribe((_res: any) => {
      if (_res && _res['status']) {
        for (let i in this.courseData) {
          if (this.courseData[i]._id == this.formObj.id) {
            this.courseData[i].name = this.formObj.name;
            this.courseData[i].price = this.formObj.price;
          }
        }
        this.service.toaster('success', _res.message);
        this.closeModal();

      }
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }
  delete(data: any) {
    // for (let index in this.courseData) {
      // if (this.courseData[index]._id == data['data']._id) {
        this.courseData.splice(data['index'], 1)
      // }

    // }
  }

}
