import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../admin-service/api.service';
declare var $: any;

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent {
  count:any = 0;
  @ViewChild('dataForm') dataForm!: NgForm;

  expertise: any = [
    { name: 'Html', isChecked: false },
    { name: 'CSS', isChecked: false },
    { name: 'Bootstrap', isChecked: false },
    { name: 'Javscript', isChecked: false },
    { name: 'Angular', isChecked: false },
  ];

  formObj: any = {
    name: '',
    roll: '',
    image: '',
    phone: '',
    description: '',
    gender: '',
    expertise: [],
    status: 1
  }

  editFile: boolean = false;

  modalLable: any = ''
  img: any = ''
  data: any = [];
  title = 'test';
  getdata: any = [];
  constructor(public http: HttpClient,
    public serive: ApiService) { }

  ngOnInit() {
    this.getDTa();
  }

  openDataModal(key: any, data: any) {
    this.modalLable = key;
    this.editFile = false;
    if (key == 'Add') {
    console.log("add",this.formObj)

      this.formObj.status = 1;
    console.log("add",this.formObj)


      // this.expertise.forEach((item:any) => {if(item.isChecked){item.isChecked = false;}});
      this.formObj.expertise = [];
      // this.dataForm.resetForm();
      $('#formModal').modal('show');
    }
    else {
      this.formObj = {...data};
      console.log("aa",this.formObj)
      console.log("form",this.formObj)

      // for (let i in data.expertise) {
      //   for (let j in this.expertise) {
      //     if (data.expertise[i].name == this.expertise[j].name) {
      //       this.expertise[j].isChecked = data.expertise[i].isChecked;
      //     }
      //   }
      // }

      $('#formModal').modal('show');
    }
  }

  checked(event: any, data: any) {
    console.log("check", event, data);
    if (event.target.checked) {
      this.formObj.expertise.push({ name: data.name, isChecked: event.target.checked });
    } else {
      const index = this.formObj.expertise.indexOf(data.name);
      console.log("111", index)
      if (index > -1) {
        this.formObj.expertise.splice(index, 1);
      }
    }
  }

  submit(form: any) {
    console.log("33", this.formObj,form.value)
    if (form.valid) {
      const formData = new FormData();
      formData.append('image', this.formObj.image);
      formData.append('data', JSON.stringify(this.formObj));
      this.serive.postApi(formData, 'add-trainer').then((_res: any) => {
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
    this.serive.getItems('trainer').then((_res: any) => {
      this.getdata = _res;

    })
  }

  isCheckedFunc(name:any, i:any){
    return this.formObj.expertise.some((item:any) => item.name == name);
  }
  actdeactCheckbox(ev: any, item: any) {
    if (ev.target.checked) {
      console.log("api1",item);
       this.serive.postApi({ id: item._id, status: true}, 'active').then((res: any) => {
          this.serive.toaster('success',res.msg);
          item.status = 1;
       }, (err: any) => this.serive.toaster('error',JSON.stringify(err)));
    } else {
      console.log("api2",item);
       this.serive.postApi({ id: item._id, status: false }, 'deactive').then((res: any) => {
        this.serive.toaster('success',res.msg);
          item.status = 0;
       }, (err: any) => this.serive.toaster('error',JSON.stringify(err)));
    }
 }
  closeModel() {
    $('#formModal').modal('hide');
    this.dataForm.resetForm();

  }

  delete(data: any, tableName: any, array: any) {
    this.serive.swalFire().then((result: any) => {
      if (result.value) {
        this.serive.postApi({ id: data._id, TableName: tableName }, 'delete').then((_res:any) => {
          if (_res) {
            for (let index in array) {
              if (array[index]._id == data._id) {
                array.splice(index, 1);
              }
            }
            this.serive.toaster('success', _res.message);
          }
        },
          _err => {
            console.log("something wrong", _err);
          }
        );
      }
    })
  }




  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    this.formObj.image = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(this.formObj.image);
      reader.onload = () => {
        this.img = reader.result;
        this.editFile = true;
      }
    }
  }


  edit(form:any){
    if(form.valid){
    const formData = new FormData();
    formData.append('image', this.formObj.image);
    formData.append('data', JSON.stringify(this.formObj));
    this.serive.postApi(formData,'edit-Trainer').then((res:any)=>{
      if (res && res['status']) {
        for (let i in this.getdata) {
          if (this.getdata[i]._id == this.formObj._id) {
            this.getdata[i] = res.data;
          }
        }
        this.serive.toaster('success', res.message);
          this.closeModel();
      }
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }
}

}
  

