import { Component } from '@angular/core';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  fomObj:any = {
    name:'',
    message:'',
    email:'',
    subject:''
  }
   constructor(public service:ServicetestService){

   }
ngOnInit(){

}

  submit(conatctForm:any){
    console.log("123",conatctForm)
    if(conatctForm.form.valid){
    this.service.postApi(this.fomObj,'contact_us').then((res:any)=>{
      this.service.toaster('success',res.message);
      conatctForm.reset();
    }, _err => {
      alert(JSON.stringify(_err));
    })
  }
  else{
    this.service.toaster('error','please fill all requird fillds')
  }
}
}
