import { Component } from '@angular/core';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  allEvent:any = []
  constructor(public service:ServicetestService){

  }
  ngOnInit(){
    this.getEvent();
  }
  getEvent(){
    this.service.getItems('all-event').then((res:any)=>{
      this.allEvent = res;
    })
  }
}
