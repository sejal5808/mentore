import { Component } from '@angular/core';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent {
  getdata:any = [];
  constructor(public serive:ServicetestService){

  }
ngOnInit(){
  this.getDTa();

}
  getDTa() {
    this.serive.getItems('activeTrainer').then((_res: any) => {
      this.getdata = _res;

    })
  }

}
