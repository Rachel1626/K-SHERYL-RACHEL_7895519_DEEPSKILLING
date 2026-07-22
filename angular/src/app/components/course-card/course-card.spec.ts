import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
    description: 'Fundamental data structures and algorithms',
  };

  const initialState = {
    course: { courses: [], loading: false, error: null },
    enrollment: { enrolledCourseIds: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({ initialState }),
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Data Structures');
  });

  it('should display course code', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('CS101');
  });

  it('should emit enrollRequested event when Enroll button is clicked', () => {
    vi.spyOn(component.enrollRequested, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const enrollButton = Array.from(buttons).find(b => b.textContent?.includes('Enroll'));
    enrollButton?.click();
    fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should toggle expanded state on Show Details click', () => {
    expect(component.isExpanded).toBeFalsy();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const toggleButton = Array.from(buttons).find(b => b.textContent?.includes('Details'));
    toggleButton?.click();
    fixture.detectChanges();
    expect(component.isExpanded).toBeTruthy();
  });

  it('should log on ngOnChanges', () => {
    vi.spyOn(console, 'log');
    const simpleChanges = {
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    component.ngOnChanges(simpleChanges);
    expect(console.log).toHaveBeenCalled();
  });
});
