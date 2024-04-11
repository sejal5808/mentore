import { Component } from '@angular/core';
import { GlobleService } from '../services/globle.service';
import { ApiService } from 'src/app/admin/admin-service/api.service';
import { ServicetestService } from '../services/servicetest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  message: string = '';
  recipientId: string = '6613dc58bbbfae1100d05ce5'; // Initialize recipient ID
  userId: string = this.api.loginData._id; // Get current user ID from authentication service

  constructor(private socketService: GlobleService,private api:ServicetestService) { }

  // ngOnInit(): void {
  //   console.log("123",this.userId)
  //   this.socketService.getMessages(this.userId).subscribe((data: any) => {
  //     console.log('Received message:', data);
  //     // Handle received message
  //   });
  // }

  // sendMessage(): void {
  //   this.socketService.sendMessage(this.message, this.recipientId);
  //   this.message = ''; // Clear the input field after sending
  // }
}
