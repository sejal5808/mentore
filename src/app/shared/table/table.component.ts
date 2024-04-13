import { Component, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() headers = [];
  @Input() data = [];
  // @Input() headers2 = [];
  // @Input() data2 = [];
  @Output() openModalEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  @Input() senddata = {name:'',price:''};
constructor(){
}
  openModal(data:any,key:any) {
    this.openModalEvent.emit({data:data, key:key});
    
  }
  delete(data:any,index:any){
    this.deleteEvent.emit({data:data,index:index});
  }
  
}