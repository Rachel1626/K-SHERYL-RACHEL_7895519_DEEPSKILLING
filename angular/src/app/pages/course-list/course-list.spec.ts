import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import { vi } from 'vitest';

describe('CourseList (NgRx-connected)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'pending' },
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null,
    },
    enrollment: { enrolledCourseIds: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([]),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display course cards when loaded', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-course-card');
    expect(cards.length).toBe(2);
  });

  it('should show loading indicator when loading is true', () => {
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading courses...');
  });

  it('should show no courses message when courses array is empty', () => {
    store.setState({
      course: { courses: [], loading: false, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No courses available');
  });

  it('should show error message when error exists', () => {
    store.setState({
      course: { courses: [], loading: false, error: 'Failed to load courses' },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Failed to load courses');
  });

  it('should dispatch loadCourses action on init', () => {
    vi.spyOn(store, 'dispatch');
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
