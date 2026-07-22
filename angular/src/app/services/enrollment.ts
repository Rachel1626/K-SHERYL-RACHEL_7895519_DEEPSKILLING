import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root',
})
export class Enrollment {
  private apiUrl = 'http://localhost:3000/enrollments';
  private enrolledCourseIds: number[] = [];

  constructor(private http: HttpClient, private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map(id => this.courseService.getLocalCourseById(id))
      .filter((c): c is Course => c !== undefined);
  }

  getStudentsByCourse(courseId: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}?courseId=${courseId}`).pipe(
      map((enrollments: any[]) => enrollments.map((e: any) => e.studentName))
    );
  }
}
