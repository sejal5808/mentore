import { Component } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  getdata: any = [];
  trainer: any = [];
  constructor(public serive: ServicetestService, private lightbox: Lightbox) {

  }

  ngOnInit() {
    this.getDTa();

  }


  getDTa() {
    this.serive.getItems('courses').then((response: any) => {
      this.getdata = response.courses;
      this.trainer = response.trainer;
    })
  }
  openLightbox(item: any) {
    console.log("item", item)
    let img: any = []
    for (let i in item.image) {
      img.push({
        "src": this.serive.imageUrl + 'Course' + '/' + item.image[i],
      })
    }
    this.lightbox.open(img, 0, {
      wrapAround: true,
      showImageNumberLabel: true,
      disableScrolling: true,
      alwaysShowNavOnTouchDevices: true,
      centerVertically: false
    });
  }
  actdeactlike(ev: any, item: any) {
    let likeDeslike
    if (item.like == null || item.like == false) {
      likeDeslike = true;
    }
    else {
      likeDeslike = false;
    }

    this.serive.postApi({ id: item._id, is_like: this.serive.loginData._id, like: likeDeslike }, 'like').then((res: any) => {
      for(let i in this.getdata){
        if(this.getdata[i]._id == res.data._id){
          console.log(this.getdata[i]._id == res.data._id);
this.getdata[i] = res.data;
console.log("123",this.getdata[i]);
        }

      }
      this.serive.toaster('success', res.message);

    })
  }

}
