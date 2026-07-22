import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgIf, NgStyle, AsyncPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import * as EnrollmentActions from '../../store/enrollment/enrollment.actions';

@Component({
  selector: 'app-course-card',
  imports: [NgClass, NgIf, NgStyle, AsyncPipe, TitleCasePipe, RouterLink, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  enrolledIds$!: Observable<number[]>;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const curr = changes['course'].currentValue;
      console.log(`CourseCard ngOnChanges — Previous: ${prev?.name}, Current: ${curr?.name}`);
    }
  }

  ngOnInit(): void {
    this.enrolledIds$ = this.store.select(selectEnrolledIds);
  }

  onEnroll(): void {
    this.enrollRequested.emit(this.course.id);
    this.store.dispatch(EnrollmentActions.enrollInCourse({ courseId: this.course.id }));
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  get cardClasses() {
    return {
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded,
    };
  }

  get borderStyle() {
    switch (this.course.gradeStatus) {
      case 'passed': return '4px solid #4caf50';
      case 'failed': return '4px solid #f44336';
      case 'pending': return '4px solid #9e9e9e';
      default: return '4px solid #ccc';
    }
  }
}
