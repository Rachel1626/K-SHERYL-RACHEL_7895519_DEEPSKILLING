import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Loading } from '../../services/loading';

@Component({
  selector: 'app-loading-spinner',
  imports: [AsyncPipe, NgIf],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  constructor(public loadingService: Loading) {}
}
