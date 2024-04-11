import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GlobleService {
  isSidebarActive: boolean = true;
  isSpinner: boolean = false;
  loginData: any = {};
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    console.log( this.isSidebarActive)
  }

  // private socket: Socket;

  constructor() {
    // this.socket = io('http://192.168.1.37:8000/'); // Adjust the URL if your server is running on a different port or domain
  }

  sendMessage(message: string) {
    // this.socket.emit('chat message', message);
  }

  getMessage(): Observable<string> {
    return new Observable<string>(observer => {
  //     this.socket.on('chat message', (msg: string) => {
  //       observer.next(msg);
  //     });
    });
  }
  swalFire() {
    return Swal.fire({
      position: 'center',
      title: 'Are you sure?',
      // text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,',
      cancelButtonText: 'No'
    })
  }
}
