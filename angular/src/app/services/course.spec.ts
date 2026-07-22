import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CourseService,
      ],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Data Structures');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should fetch a single course by ID', () => {
    service.getCourseById(1).subscribe((course) => {
      expect(course).toBeDefined();
      expect(course?.name).toBe('Data Structures');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should create a course via POST', () => {
    const newCourse = { name: 'AI', code: 'CS601', credits: 3, gradeStatus: 'pending' as const };

    service.createCourse(newCourse).subscribe((course) => {
      expect(course.name).toBe('AI');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush({ id: 6, ...newCourse });
  });

  it('should handle error response', () => {
    service.getCourses().subscribe({
      next: () => { throw new Error('Expected an error'); },
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return local courses', () => {
    const courses = service.getLocalCourses();
    expect(courses.length).toBeGreaterThan(0);
  });

  it('should return local course by ID', () => {
    const course = service.getLocalCourseById(1);
    expect(course).toBeDefined();
    expect(course?.name).toBe('Data Structures');
  });
});
