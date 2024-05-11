import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicetestService {
  loginData: any = {};

  private apiUrl = 'http://192.168.1.25:8000/api/';
  public imageUrl = 'http://192.168.1.25:8000/uploads/'
  isLayoutSidebarActive: boolean = false;
  private socket;

  constructor(private http: HttpClient,) {
    // user conntection with server  
    this.socket = io('http://192.168.1.25:8000', { transports: ['websocket'] });

  }


  //user coonect with server with id 
  connect(userId: string) {
    this.socket.emit('user_connected', userId);
  }

  // get online conntectd user 
  onlineuser() {
    return fromEvent(this.socket, 'user_connected');
  }

  //receive messages 
  receiveMessages(): Observable<any> {
    return fromEvent(this.socket, 'private_message');
  }

  //send message
  sendPrivateMessage(message: any) {
    this.socket.emit('private_message', message);
  }

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
    const token: any = localStorage.getItem('token'); // Retrieve token from local storage
    // Attach token to request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(token)}`
    });
    console.log("12322", headers)
    return new Promise((resolve, rejects) => {
      this.http.post(this.apiUrl + url, data, { headers }).subscribe((res: any) => {
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
  // saveData() {
  //   return new Promise((resolve, rejects) => {
  //     this.http.get("http://localhost:3000/posts").subscribe((res: any) => {
  //       resolve(res);
  //     }, (err: any) => {
  //       rejects(err);
  //     })

  //   })
  // }

  // submitData(data: any) {
  //   return new Promise((resolve, rejects) => {
  //     this.http.post("http://localhost:3000/posts", data).subscribe((res: any) => {
  //       resolve(res);
  //       console.log("kjhkdhsdhsdufhsdufh", res)

  //     }, (err: any) => {
  //       rejects(err)
  //     })
  //   })
  // }

  // DeleteData(id: any) {
  //   return new Promise((resolve, reject) => {
  //     this.http.delete("http://localhost:3000/posts/" + id).subscribe((res: any) => {
  //       resolve(res);
  //       console.log("kjhkdhsdhsdufhsdufh")
  //     }, (err: any) => {
  //       reject(err);
  //     })
  //   })
  // }
  // editData(data: any) {
  //   console.log("asdgfd", data)
  //   return new Promise((resolve, reject) => {
  //     this.http.put("http://localhost:3000/posts/" + data.id, data).subscribe((res: any) => {
  //       resolve(res);
  //     },
  //       (err: any) => {
  //         reject(err);

  //       })
  //   })
  // }



}
