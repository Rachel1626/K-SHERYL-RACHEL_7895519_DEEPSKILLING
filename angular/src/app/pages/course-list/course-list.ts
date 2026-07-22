import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';
import * as CourseActions from '../../store/course/course.actions';

@Component({
  selector: 'app-course-list',
  imports: [NgIf, NgFor, AsyncPipe, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$!: Observable<Course[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  searchTerm = '';
  selectedCourseId: number | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const searchQuery = this.route.snapshot.queryParamMap.get('search');
    if (searchQuery) {
      this.searchTerm = searchQuery;
    }

    this.store.dispatch(CourseActions.loadCourses());
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  filterCourses(term: string): void {
    this.searchTerm = term;
    if (term) {
      this.router.navigate(['/courses'], { queryParams: { search: term } });
    } else {
      this.router.navigate(['/courses']);
    }
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }
}
