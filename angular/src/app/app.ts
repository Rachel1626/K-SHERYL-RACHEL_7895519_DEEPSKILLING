import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { Notification } from './components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoadingSpinner, Notification],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Student Course Portal';
}
