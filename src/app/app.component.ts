import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ServicetestService } from './pages/services/servicetest.service';
import { ApiService } from './admin/admin-service/api.service';
import { GlobleService } from './admin/admin-service/globle.service';
declare let $: any;




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('dataForm') dataForm!: NgForm;

  formObj: any = {
    name: '',
    country: '',
    slogan: '',
    createdAt: '',
    established: ''
  }
  modalLable: any = ''
  data: any = [];
  title = 'test';
  getdata: any = [];
  apiurl: any = 'http://localhost:5000/v1/'
  api: any = 'http://localhost:5000/v1/airlines/get-all'

  constructor(public http: HttpClient, public serive: ServicetestService,public gs:GlobleService ) { }

  ngOnInit() {
    this.serive.loginData = JSON.parse(localStorage.getItem('userlogin') || '{}');

    // this.getdatatable();
    // this.getdata()
  }

  // getnewdata(){
  //  this.serive.getData({},'airlines/get-all').then((res:any)=>{
  //    this.getdata = res.data;
  //    console.log("data",this.getdata)
  //  },(err:any)=>{
  //  console.log("data",err)}
  //  )
  // }

  // getdatatable() {

  //   this.serive.saveData().then((res: any) => {
  //     this.getdata = res;
  //   }, (err: any) => {
  //     console.log("data", err)
  //   }
  //   )
  // }

  // openDataModal(key: any, data: any) {
  //   this.modalLable = key;
  //   if (key == 'add') {
  //     $('#formModal').modal('show');
  //   }
  //   else {
  //     $('#formModal').modal('show');
  //     this.formObj.id = data.id;
  //     this.formObj.name = data.name;
  //     this.formObj.country = data.country;
  //     this.formObj.slogan = data.slogan;
  //     this.formObj.established = data.established;
  //     this.formObj.createdAt = data.createdAt
  //   }

  // }

  // openMOdel() {
  //   $('#formModal').modal('show');
  // }

  // closeModel() {
  //   $('#formModal').modal('hide');
  //   this.dataForm.resetForm()
  // }

  // submit(form: any) {
  //   console.log("fkf", this.formObj)
  //   // if (form.valid) {
  //   this.serive.submitData(this.formObj).then((_res: any) => {
  //     console.log("dhsg>>")
  //     this.getdata.push(_res);
  //     this.closeModel()
  //   },
  //     _err => {
  //       console.log("kjdshfjks", _err);
  //     }
  //   )
  //   //  else {
  //   //   console.log("somthing was wrong");

  //   // }

  // }

  // delete(id: any, array: any) {
  //   this.serive.DeleteData(id).then((): void => {
  //     for (let index in array) {
  //       if (array[index].id == id) {
  //         array.splice(index, 1);
  //       }
  //     }

  //   },
  //     _err => {
  //       console.log("something wrong", _err);
  //     }
  //   );
  // }

  // update(form: any) {
  //   // if (form.valid) {
  //     console.log("this.form.value>>>>", form.value)
  //     this.serive.editData(this.formObj).then((_res: any) => {
  //       if (_res) {
  //         for (let i in this.getdata) {
  //           if (this.getdata[i].id == _res.id) {
  //             this.getdata[i].name = _res.name;
  //             this.getdata[i].country = _res.country;
  //             this.getdata[i].established = _res.established;
  //             this.getdata[i].createdAt = _res.createdAt;
  //             this.getdata[i].slogan = _res.slogan
  //           }

  //         }
  //         this.closeModel()

  //       }
  //     },
  //       _err => {
  //         console.log("kjdshfjks", _err);
  //       }
  //     )
  //   // } else {
  //   //   console.log("somthing was wrong");

  //   // }


  // }

}
