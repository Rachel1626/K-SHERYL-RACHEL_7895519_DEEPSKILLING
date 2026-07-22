import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  show(message: string): void {
    this.messageSubject.next(message);
    setTimeout(() => this.messageSubject.next(''), 3000);
  }

  clear(): void {
    this.messageSubject.next('');
  }
}
