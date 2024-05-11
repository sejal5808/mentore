import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from '../admin-service/api.service';
declare var $: any;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
}) 
export class AddEventComponent {
  myForm: FormGroup = new FormGroup({
id:new FormControl(''),
title:new FormControl(''),
image:new FormControl(''),
description:new FormControl(''),
date:new FormControl(''),
day:new FormControl(''),
time: new FormControl(''),

  });
  modelLabel: any = '';
  loaded: boolean = false;
  editFile: boolean = false;
  imageurl: any = '';
  allEvent: any = [];
  submitted: boolean = false;

  config: any = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph']],
      ['misc', ['codeview', 'undo', 'redo']],
      ['insert', ['table', 'picture', 'link', 'video',]]
    ],
    fontNames: ['Helvetica', 'arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };

  constructor(private fb: FormBuilder, public service: ApiService) {

    this.myForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getEvent();
  }
  get f(): { [key: string]: AbstractControl } {
    console.log("111", this.myForm.controls)
    return this.myForm.controls;
  }
  getEvent() {
    this.service.getItems('all-event').then((res: any) => {
      this.allEvent = res;
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }

  submit(form: any) {
    this.submitted = true;
    console.log("form>>>",form.value)
    return
    if (form.valid) {
      console.log("form", form.value, this.myForm)
      this.service.postApi(form.value, 'add-event').then((res: any) => {
        this.allEvent.push(res.data);
        this.service.toaster('success', res.message);
        this.closeModel();
      })
    }

  }

  openModel(key: any, data: any) {
    if (key == 'Add') {
      this.modelLabel = key;
      this.imageurl = '';
      $('#eventModal').modal('show');

    }
    else {
      $('#eventModal').modal('show');
      this.myForm.patchValue({
        id: data._id,
        title: data.title,
        image: data.image,
        description: data.description,
        date: data.date,
        day: data.day,
        time: data.time,
      })

      this.imageurl = data.image;
      console.log("data", data)

    }


  }
  closeModel() {
    $('#eventModal').modal('hide');
    this.myForm.reset();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log("reader111",reader)

      // reader.readAsDataURL(file);
      console.log("reader222",reader)

      reader.onload = () => {

        this.myForm.patchValue({
          image: reader.result // Set Base64 image data

        });
        console.log("form>>",this.myForm.value)
        this.imageurl = reader.result;
        this.editFile = true;
      };
    }
  }


  delete(data: any, tableName: any, array: any) {
    this.service.swalFire().then((result: any) => {
      if (result.value) {
        this.service.postApi({ id: data._id, TableName: tableName }, 'delete').then((_res: any) => {
          if (_res && _res['status']) {
            for (let index in array) {
              if (array[index]._id == data._id) {
                array.splice(index, 1);
              }
            }
            this.service.toaster('success', _res.message);
          }
        },
          _err => {
            console.log("something wrong", _err);
          }
        );
      }
    })
  }

  update(form: any) {
    if (form.valid) {
      console.log("12", form.value, this.myForm)
      this.service.postApi(form.value, 'edit-event').then((res: any) => {
        if (res && res['status']) {
          for (let i in this.allEvent) {
            if (this.allEvent[i]._id == form.value.id) {
              this.allEvent[i] = res.data;
            }
          }
          this.service.toaster('success', res.message);
          this.closeModel();
        }
      }, _err => {
        alert(JSON.stringify(_err));
      })
    }
  }
}
