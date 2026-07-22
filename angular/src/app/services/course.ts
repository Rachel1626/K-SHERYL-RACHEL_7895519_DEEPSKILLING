import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  private courses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed', description: 'Fundamental data structures and algorithms' },
    { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'pending', description: 'Process management, memory, and file systems' },
    { id: 3, name: 'Database Systems', code: 'CS301', credits: 4, gradeStatus: 'failed', description: 'Relational databases, SQL, and normalization' },
    { id: 4, name: 'Computer Networks', code: 'CS401', credits: 3, gradeStatus: 'passed', description: 'Networking protocols and architecture' },
    { id: 5, name: 'Software Engineering', code: 'CS501', credits: 3, gradeStatus: 'pending', description: 'Software development lifecycle and methodologies' },
  ];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLocalCourses(): Course[] {
    return this.courses;
  }

  getLocalCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addLocalCourse(course: Course): void {
    this.courses.push(course);
  }
}
