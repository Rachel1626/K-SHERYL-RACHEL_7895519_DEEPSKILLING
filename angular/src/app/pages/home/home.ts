import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  imports: [NgIf, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  courseCount = 0;
  enrolledCount = 3;
  gpa = 3.8;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseCount = this.courseService.getLocalCourses().length;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // [property] is one-way binding: component → DOM. It sets a DOM property from a TS value.
  // [(ngModel)] is two-way binding: DOM ↔ component. It's shorthand for [ngModel] + (ngModelChange).
}
