import { Component } from '@angular/core';
import { ApiService } from '../admin-service/api.service';
import { GlobleService } from '../admin-service/globle.service';

@Component({
  selector: 'app-second-child',
  templateUrl: './second-child.component.html',
  styleUrls: ['./second-child.component.scss']
})
export class SecondChildComponent {
  modalLabel: any = ""

  formObj: any = {
    name: '',
    price: ''
  }
  shareData: any = [];
  courseData: any = [];

  headers: any = [
    { key: "name", label: "Name" },
    { key: "gender", label: "gender" },
    { key: "roll", label: "Roll" }


  ]

  constructor(public gb: GlobleService, private service: ApiService) { }
  ngOnInit() {
    this.getData();
  }


  getData() {
    this.service.getItems('trainer').then((_res: any) => {
      this.courseData = _res;
    })
  }
}
