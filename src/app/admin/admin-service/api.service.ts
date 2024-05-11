import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
import { GlobleService } from './globle.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://192.168.1.25:8000/api/';
  public imageUrl = 'http://192.168.1.25:8000/uploads/'
  isLayoutSidebarActive:boolean = false;

  constructor(private http: HttpClient,public gs:GlobleService) {
    this.socket = io('http://192.168.1.25:8000', { transports : ['websocket'] });
    this.socket.emit('login', this.gs.loginData._id);
   
   }



  private socket;    

  sendMessage(message: string, recipientUserId: string) {
    console.log("mesg",message,recipientUserId)
    this.socket.emit('chat message', { message, recipientUserId });
  }

  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chat message', (data: any) => {
        observer.next(data);
      });
    });
  }

login(userId: string) {
  this.socket.emit('login', userId);
}

// sendMessageToUser(userId: string, message: string) {
//   this.socket.emit('privateMessage', { userId, message });
//   console.log("123id",userId)
// }

// getPrivateMessages(): Observable<string> {
//   return new Observable<string>(observer => {
//     this.socket.on('privateMessage', (message: string) => {
//       observer.next(message);
//     });
//   });
// }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);

  }

  getItems(url: any) {
    return new Promise((resolve, rejects) => {
      this.http.get(this.apiUrl + url).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        rejects(err);
      })
    })
  }

  postApi(data: any, url: any) {
    const token:any = localStorage.getItem('token'); // Retrieve token from local storage
    // Attach token to request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(token)}`
    });
    console.log("12322",headers)
    return new Promise((resolve, rejects) => {
      this.http.post(this.apiUrl + url, data,{headers}).subscribe((res: any) => {
        resolve(res);
      }, (err) => {
        rejects(err);
      });
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.http.post<any>(this.imageUrl, formData).subscribe(res => {
      console.log(res.image); // Handle the response as needed
    });
  }

  swalFire() {
    return Swal.fire({
      position: 'center',
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,',
      cancelButtonText: 'No'
    })
  }

  toaster(icon: 'success' | 'error' | 'warning' | 'info' | 'question', message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: icon || 'error',
      title: message || 'something went to wrong'
    })
  }
}
