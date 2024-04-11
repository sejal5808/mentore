import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ServicetestService } from '../services/servicetest.service';
declare let $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
  @ViewChild('dataForm') dataForm!: NgForm;

  formObj: any = {
    name: '',
    firstName: '',
    lastName: '',
    Mobile_no: '',
    email: ''
  }
  modalLable: any = ''
  data: any = [];
  title = 'test';
  getdata: any = [];

  constructor(public http: HttpClient,
    public serive: ServicetestService) { }

  ngOnInit() {
    this.getDTa();
  }

  submit(form: any) {
    this.serive.postApi(this.formObj, 'add').then((response: any) => {
      if (response) {
        this.getdata.push(response);
        this.serive.toaster('success', response);

      }


    })
    this.closeModel()

  }
  getDTa() {
    this.serive.getItems('get').then((response: any) => {
      this.getdata = response;

    })
  }

  openDataModal(key: any, data: any) {
    this.modalLable = key;
    if (key == 'add') {
      $('#formModal').modal('show');
    }
    else {
      this.formObj.id = data._id;
      this.formObj.name = data.name;
      this.formObj.firstName = data.firstName;
      this.formObj.lastName = data.lastName;
      this.formObj.Mobile_no = data.Mobile_no;
      this.formObj.email = data.email;
      this.formObj.image = data.image;
      console.log("data>>", data);

      $('#formModal').modal('show');

    }

  }

  openMOdel() {
    $('#formModal').modal('show');
  }

  closeModel() {
    $('#formModal').modal('hide');
    this.dataForm.resetForm()
  }

  delete(data: any, array: any) {
    console.log("delete", data._id, array);
    this.serive.postApi(data._id,'delete').then((): void => {
      for (let index in array) {
        if (array[index]._id == data._id) {
          array.splice(index, 1);
          console.log("11>>>", array.splice(index, 1));

        }
      }

    },
      _err => {
        console.log("something wrong", _err);
      }
    );
  }
  update(form: any) {
    console.log("data", form.value);
    this.serive.updateItem(this.formObj.id, form.value).subscribe((_res: any) => {
      if (_res) {
        for (let i in this.getdata) {
          if (this.getdata[i]._id == this.formObj.id) {
            this.getdata[i].name = this.formObj.name;
            this.getdata[i].firstName = this.formObj.firstName;
            this.getdata[i].lastName = this.formObj.lastName;
            this.getdata[i].email = this.formObj.email;
            this.getdata[i].Mobile_no = this.formObj.Mobile_no;
            this.getdata[i].image = this.formObj.image
          }

        }
        console.log(_res, "upadte");
        this.closeModel();
      }
    }, _err => {
      console.log("Error:", _err);
    });
  }


}





