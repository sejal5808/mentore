import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../admin-service/api.service';
import { GlobleService } from '../admin-service/globle.service';
declare let $: any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @ViewChild('dataForm') dataForm!: NgForm;

imagArray:any =[]
  formObj: any = {
    name: '',
    price: '',
    image: [],
    SubTitle: '',
    description: ''
  }
  file:any
  editFile: boolean = false;
  files:any=[];
  modalLable: any = ''
  img: any = ''
  data: any = [];
  title = 'test';
  getdata: any = [];
  constructor(public http: HttpClient,
    public serive: ApiService,public gs:GlobleService) { }

  ngOnInit() {
    this.getDTa();
  }

  onSelect(event:any,folderName:any) {
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    event.addedFiles.forEach((file: File) => {
      formData.append('file', file);
    });
    formData.append('folderName', folderName);
    this.serive.postApi(formData,'upload').then((_res:any)=>{
      this.formObj.image.push(_res.filenames[0])
      console.log("16",this.formObj.image)
    })

  }
  remove(event:any){
    console.log(event)
    this.formObj.image.splice( this.formObj.image.indexOf(event), 1);
  }
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  submit(form: any) {
    if (form.valid) {
      // const formData = new FormData();
      // formData.append('image', this.formObj.image);
      // formData.append('data', JSON.stringify(this.formObj));
      this.formObj.id = this.gs.loginData._id;

      this.serive.postApi(this.formObj, 'Add-courses').then((_res: any) => {
        if (_res && _res['status']) {
          this.getdata.push(_res.data);
          this.serive.toaster('success', _res.message);
          this.closeModel();

        }
        else {
          this.serive.toaster('error', _res.message);
          this.closeModel();

        }
      }, _err => {
        alert(JSON.stringify(_err));
      })
    } else {
      this.serive.toaster('error', 'Please fill all required fields');
    }
  }

  getDTa() {
    this.serive.getItems('courses').then((_res: any) => {
      this.getdata = _res.courses;

    })
  }

  openDataModal(key: any, data: any) {
    this.modalLable = key;
    this.editFile = false;
    if (key == 'Add') {
      this.formObj.image = []

      $('#formModal').modal('show');
    }
    else {
      console.log("11",data);
      this.formObj.id = data._id;
      this.formObj.name = data.name;
      this.formObj.price = data.price;
      this.formObj.SubTitle = data.SubTitle;
      this.formObj.image = data.image;
      this.formObj.description = data.description
      $('#formModal').modal('show');
    }
  }

  openMOdel() {
    $('#formModal').modal('show');
  }

  closeModel() {
    $('#formModal').modal('hide');
    this.dataForm.resetForm();
  }

  delete(data: any,tableName:any, array: any) {
    this.serive.swalFire().then((result: any) => {
      if (result.value) {
    this.serive.postApi({id:data._id,TableName:tableName},'delete').then((_res:any) => {
      if (_res && _res['status']) {
      for (let index in array) {
        if (array[index]._id == data._id) {
          array.splice(index, 1);
        }
      }
      this.serive.toaster('success', _res.message);
    }
    },
      _err => {
        console.log("something wrong", _err.message);
      }
    );
   } })
  }


  update(form: any) {
    if(form.valid){
    const formData = new FormData();
    // formData.append('image', this.formObj.image);
    // formData.append('data', JSON.stringify(this.formObj));
    this.formObj.user_id = this.gs.loginData._id;

    this.serive.updateItem(this.formObj.id, this.formObj).subscribe((_res: any) => {
      if (_res && _res['status']) {
        for (let i in this.getdata) {
          if (this.getdata[i]._id == this.formObj.id) {
            this.getdata[i].name = this.formObj.name;
            this.getdata[i].SubTitle = this.formObj.SubTitle;
            this.getdata[i].description = this.formObj.description;
            this.getdata[i].image = this.formObj.image;
            this.getdata[i].price = this.formObj.price;
          }
        }
        this.serive.toaster('success', _res.message);
          this.closeModel();
      }
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }
  else {
      this.serive.toaster('error', 'Please fill all required fields');
    }
  }

  uploadFile(event: any) {
    let reader = new FileReader(); 
    this.formObj.image = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.formObj.image);
      reader.onload = () => {
        this.img = reader.result;
        this.editFile = true;
      }
    }
  }
}
