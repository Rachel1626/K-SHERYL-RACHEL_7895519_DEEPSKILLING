import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit message when show is called', () => {
    let receivedMessage = '';
    service.message$.subscribe(msg => receivedMessage = msg);
    service.show('Test message');
    expect(receivedMessage).toBe('Test message');
  });

  it('should clear message', () => {
    service.show('Test');
    service.clear();
    let receivedMessage = '';
    service.message$.subscribe(msg => receivedMessage = msg);
    expect(receivedMessage).toBe('');
  });
});
