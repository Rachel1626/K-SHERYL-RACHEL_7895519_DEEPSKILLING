import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe, NgIf],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  constructor(public notificationService: NotificationService) {}
}
