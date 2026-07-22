import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  studentName = 'John Doe';
  studentEmail = 'john.doe@college.edu';
  studentId = 'STU-2024-001';

  enrolledCourses$!: Observable<Course[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }
}
