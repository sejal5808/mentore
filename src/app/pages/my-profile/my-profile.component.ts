import { Component } from '@angular/core';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  formObj:any = {
    username:'',
    email:'',
    phone:'',
    password:'',
    gender:'',
    image:'',
    id: ''
  }
  profile_img:any
  isEditImage:boolean = false;


  constructor(public service:ServicetestService){
  }
  
  ngOnInit(){
    this.service.loginData = JSON.parse(localStorage.getItem('userlogin') || '{}');
    console.log(this.service.loginData)
    this.formObj.id = this.service.loginData._id;
    this.formObj.username = this.service.loginData.username;
    this.formObj.email = this.service.loginData.email;
    this.formObj.phone = this.service.loginData.phone;
    // this.formObj.password = this.service.loginData.password;
    this.formObj.image = this.service.loginData.image;
    this.formObj.gender = this.service.loginData.gender;

  }



  uplodImg(event:any){
    this.isEditImage = true;
    this.readThis(event.target);
  }


   // ######## readThis for image base 64
  readThis(inputValue: any): void {
    let file: File = inputValue.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }
    const imageSizeInBytes = file.size;
    const imageSizeInKB = imageSizeInBytes / 1024;
    if(imageSizeInKB > 25 ){
      return alert("only except less than 25 kb images")
    }

    let reader: FileReader = new FileReader();
    reader.onloadend = (e) => {
     this.formObj.image = reader.result;

   }
   reader.readAsDataURL(file);
 }

 update(form:any){
  this.service.postApi(this.formObj,'update-profile').then((res:any)=>{
    this.service.toaster("success", res.message);
    this.service.loginData = {};
    localStorage.setItem('userlogin', JSON.stringify(res.data || {}));
    console.log(localStorage)
    this.service.loginData = JSON.parse(localStorage.getItem("loginData") || '{}');
    console.log(this.service.loginData)

  }, _err => {
    console.log("Error:", _err);
  });

}
}